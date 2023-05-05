/**
 * IMPORT
 */

import { User } from '../models/modelUser.js'
import bcrypt from 'bcryptjs'
import conn$ from '../config/dbconnect.js'
import { getAll,getByEmail , insertUser} from '../repository/userRepo.js'



export const listOf = async (req,res,tab,red)=>{

    try {
        conn$.query(`select * from ${tab} ORDER BY id DESC`, (e,r)=> {
            res.render(red, { infos:r })
        })
  
         
    } catch (error) {
        console.log(error)
    }
}
 

export const loginLoadAd =  async (req,res)=>{

    try {
        const id = req.session.user_id
        conn$.query(`
            SELECT *
            FROM user
            WHERE id = ?
            `, [id], (e,r) => {
            let userInfo = r[0]

            res.render('admin/home', { user: userInfo })
            
        })
        
    } catch (error) {
        console.log()

    }
}


export const verifLogAd = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }

}

export const addUser = async (req, res) =>{
    const {username,password,email} = req.body;

    insertUser(username,password,email);
    res.redirect('/admin/home',{msg_succes:"nouveaux utilisateur crée "})
}
 
export const updateUser = async (req, res)=>{

    const { id } = req.params;
    const {firstname,lastname,address,email}= req.body

    conn$.query(`
    UPDATE user
    SET ?
    WHERE id = ?
    `, [{firstname: firstname,
         email: email,
         lastname: lastname,
         address: address
        }, id]);
    res.redirect("/admin/usersList");
}

export const deleteUser = async (req, res) => {

    console.log(req.params)
    const { id } = req.params;
    const result = conn$.query(`
    DELETE FROM user
    WHERE id = ?
    `, [id]);
    if (result.affectedRow === 1) {
        res.json({ message: "menu supprimé" })
    }
    res.redirect('/admin/usersList')
}

export async function update(req, res) {
    const { id } = req.params;
    conn$.query("SELECT * FROM user WHERE id = ?", 
    [id],(err, resul)=>{
        res.render("admin/editUser", { user: resul[0] });
        });   
};

export const registerAdmin = async (req, res) => {

    try {
        //recuperation des name du post et on les mets dans des varible
        let { firstname, lastname, password, email, password2, address, check} = req.body;

        //verification si le mail est dans la bd
        const result = getByEmail({ email: email });

        if (result) {

            if (result.length > 0) {

                return res.render('register', {
                    msg: 'cet email existe'
                })
            }

            else if (!firstname ||
                !lastname ||
                !email ||
                !password ||
                !password2 ||
                !address) {
                return res.render('admin/addUser', { msg: 'Tous les champs sont obligatoire' });
            }

            else if (password !== password2) {
                return res.render('admin/addUser', { msg: 'verifier vos mots passes' });
            }

            else if (password.length < 2) {
                return res.render('admin/addUser', { msg: 'trop court mdp' });
            } else {
                let is_admin = 0;
            
                if (req.body.hasOwnProperty("check")) {
                    is_admin = 1
                }
                //on hash le mdp avant l'envoi
                bcrypt.genSalt(10, (err, hash) => {

                    if (err) throw err
                    password = hash

                    insertUser(firstname, lastname, email, password, address,is_admin)
                    res.render('admin/addUser', { msg_success: "Client(e) ajout(é)e" })
                })

            }


        }

    } catch (error) {
        console.log(error)
    }

}