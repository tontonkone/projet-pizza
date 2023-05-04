/**
 * IMPORT
 */

import { User } from '../models/modelUser.js'

import conn$ from '../config/dbconnect.js'
import { getAll } from '../repository/userRepo.js'



export const listOfUser = async (req,res)=>{

    try {
        conn$.query('select * from users ORDER BY id DESC', (e,r)=> {
            res.render('admin/usersList', { users:r })
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
            FROM users
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
    const {name,email}= req.body

    conn$.query(`
    UPDATE users
    SET ?
    WHERE id = ?
    `, [{name: name, email: email}, id]);
    res.redirect("/");
}

export const deleteUser = async (req, res) => {

    console.log(req.params)
    const { id } = req.params;
    const result = conn$.query(`
    DELETE FROM users
    WHERE id = ?
    `, [id]);
    if (result.affectedRow === 1) {
        res.json({ message: "menu supprimé" })
    }
    res.redirect('/admin/usersList')
}

export async function update(req, res) {
    const { id } = req.params;
    conn$.query("SELECT * FROM users WHERE id = ?", [
        id],(err, resul)=>{
        res.render("admin/editUser", { user: resul[0] });
        });
    
};