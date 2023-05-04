import bcrypt  from 'bcryptjs';
import session from 'express-session';
import conn$ from '../config/dbconnect.js';
import { getByEmail, getById, insertUser } from '../repository/userRepo.js';
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
        let { username, password, email, password2 } = req.body;

            //verification si le mail est dans la bd
           const result = getByEmail({email:email});

        if (result){

                if (result.length > 0) {

                    return res.render('register', {
                        msg: 'cet email existe'
                    })
                }

                else if (!username || !email || !password || !password2) {
                    return res.render('register', { msg: 'Tous les champs sont obligatoire' });
                }

                else if (password !== password2) {
                    return res.render('register', { msg: 'verifier vos mots passes' });
                }

                else if (password.length < 3) {
                    return res.render('register', { msg: 'trop court mdp' });
                } else {
                    //on hash le mdp avant l'envoi
                    bcrypt.genSalt(10,(err, hash) => {

                            if (err) throw err
                            password = hash

                        insertUser(username, password, email)
                        res.render('register', { msg_success: "register good" })
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

export const  loginVer=(req, res, next) => {

    const{email,password} = req.body

    conn$.query(`
        SELECT *
        FROM users
        WHERE email = ?
        `, [email], (e, user) => {
        if (user[0]) {
            console.log(user[0])
            let match = bcrypt.compare(password, user[0].password)

            if (match) {
                console.log('verif1')
                if (user[0].is_admin === 1) {
                    req.session.is_admin = "admin";
                    req.session.user_id = user[0].id
                    req.session.user_uuid = uuid()
                    res.redirect('/admin/home')
                    console.log('passed')

                } else {
                    req.session.user_uuid = uuid()
                    req.session.user_id = user[0].id
                    console.log('passed simple');
                    res.redirect('/home')
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
            FROM users
            WHERE id = ?
            `, [id], (e, r) => {
                let userInfo = r[0] 
                res.render('home', { user: userInfo })
            })
    } catch (error) {
        console.log()
        
    }

}

export const deconnexion = (req, res)=>{

    try {
        
        req.session.destroy()
        res.redirect('/')
 
    } catch (error) {
        console.log(error)
    }

}