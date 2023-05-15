import bcrypt  from 'bcryptjs';
import session from 'express-session';
import conn$ from '../config/dbconnect.js';
import { getByEmail, insertTab, insertUser } from '../repository/userRepo.js';
import {uuid} from 'uuidv4';


/**
 * inscriptions 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */


export const register = async (req,res)=>{

    try{
        //recuperation des name du post et on les mets dans des varible
        let { firstname, lastname, password, email, password2,address } = req.body;

            //verification si le mail est dans la bd
           const result = getByEmail({email:email});

        if (result){

                if (result.length > 0) {

                    return res.render('register', {
                        msg: 'cet email existe'
                    })
                }

                else if (   !firstname ||
                            !lastname ||
                            !email || 
                            !password || 
                            !password2 || 
                            !address ) {
                    return res.render('register', { msg: 'Tous les champs sont obligatoire' });
                }

                else if (password !== password2) {
                    return res.render('register', { msg: 'verifier vos mots passes' });
                }

                else if (password.length < 2) {
                    return res.render('register', { msg: 'trop court mdp' });
                } else {
                    //on hash le mdp avant l'envoi
                    bcrypt.genSalt(10,(err, hash) => {

                            if (err) throw err
                            password = hash

                        insertUser(firstname, lastname, email, password,address);

                        res.render('register', { msg_success: "Inscription terminée vous pouvez vous connectez" });
                    })
                      
                }

        
        }   
    
    }catch (error){
        console.log(error)
    }
    
}

/**
 * connexions
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const  loginVer = async (req, res, next) => {

    const{email,password} = req.body

    const eventEmit = req.app.get('eventEmit');
    conn$.query(`
        SELECT *
        FROM user
        WHERE email = ?
        `, [email], (e, user) => {
        if (user[0]) {


            let match = bcrypt.compare(password, user[0].password)

            if (match) {
                console.log('verif1')
                if (user[0].is_admin === 1) {
                    req.session.is_admin = "admin";
                    req.session.user_id = user[0].id;
                    req.session.user_firstname = user[0].firstname;
                    req.session.user_lastname = user[0].lastname;
                    req.session.user_uuid = uuid();
                    
                    
                    eventEmit.emit('userConnected', {name:user[0].firstname,lastname: user[0].lastname});
                    res.redirect('/admin/home');
                    console.log('passed');

                } else {
                    req.session.user_uuid = uuid(); 
                    req.session.user_id = user[0].id;

                    req.session.user_firstname = user[0].firstname;
                    req.session.user_lastname = user[0].lastname;
                    //creer un event 
                   
                    //envoie de l'event 
                    eventEmit.emit('userConnected', {name:user[0].firstname,lastname: user[0].lastname});
                    res.redirect('/home'); 
                }
            }
        } else {
            console.log('no pass') 
           return  res.render('login', { msg: 'not found' })
        }
    })
}

// on rend la vue aux users

export const loginload = async (req,res)=> {
    try {

        const id = req.session.user_id
            conn$.query(`
            SELECT *
            FROM user
            WHERE id = ?
            `, [id], (e, r) => {
                if(r){
                    let userInfo = r[0]
                    res.render('home', { user: userInfo })             
                }

            })
    } catch (error) {
        console.log()
        
    }

} 

export const deconnexion = (req, res)=>{
    const eventEmit = req.app.get('eventEmit');
    try {
        eventEmit.emit('userDeconnect', { name: req.session.user_firstname, lastname: req.session.user_lastname });
        req.session.destroy()
        res.redirect('/')
        
    } catch (error) {
        console.log(error)
    }

}