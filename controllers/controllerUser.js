import bcrypt  from 'bcryptjs';
import {User} from '../models/modelUser.js'
import session from 'express-session';
import LocalStrategy from 'passport-local'


/**
 * inscriptions 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const register = async (req,res)=>{

    try{
        //recuperation des name du post et on les mets dans des varible
        const { username, password, email, password2 } = req.body;

            //verification si le mail est dans la bd
           const result = User.findOne({email:email});

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

                            const newUser = new User({
                                username,
                                email,
                                password
                            });
                            newUser.password = hash
                            newUser.save()
                                .then(user => res.render('register', { msg_success: "register good" }))
                                .catch(er => console.log(er))
                        }

                    )
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
    User.findOne({ email:email})
    .then(user => {
        
        if(user){
            let match = bcrypt.compare(password,user.password)
            if (match) {

                console.log(user.is_admin)
                if(user.is_admin){
                    req.session.is_admin = user.is_admin;
                    req.session.user_id = user._id
                    res.redirect('/admin/home')
                }else{
                    req.session.user_id = user._id
                    res.redirect('/home')
                }
            }
        }else{
            res.render('login',{msg:'not found'})
        }
    })
}


export const loginload = (req,res)=> {
    res.render('home')
}

export const deconnexion = (req, res)=>{

    try {
        
        req.session.destroy()
        res.redirect('/')

    } catch (error) {
        console.log(error)
    }

}