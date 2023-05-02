import bcrypt  from 'bcryptjs';
import conn$ from '../config/dbconnect.js'


export const register = async (req,res)=>{

    try{
        const { username, password, email, password2 } = req.body;
        conn$.query(`
            SELECT *
            FROM users
            WHERE email = ?
            `, [email], (err, result) => {

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
                bcrypt.hash(password, 10, (err, hash) => {

                    if (err) {
                        return res.render('register', { msg: "une erreur s'est produite" })
                    } else {
                        conn$.query(`
                        INSERT INTO users (name, password, email)
                        VALUES(?,?,?)
                    `, [username, hash, email], (err, result) => {
                            if (err) {
                                return res.render('register', { msg: "une erreur s'est produite" })
                            } else {

                                return res.render('register', { msg_success: "register good" })
                            }
                        })
                    }
                })
            }

        })
    
    }catch (error){
        console.log(error)
    }
    
}

export const login = async (req,res)=>{

    try {
        
    } catch (error) {
        console.log(error)
    }

}