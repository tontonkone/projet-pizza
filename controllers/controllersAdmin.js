/**
 * IMPORT
 */
import { User } from '../models/modelUser.js';
import bcrypt from 'bcryptjs';
import conn$ from '../config/dbconnect.js';
import { getAll,getByEmail , insertUser, insertEmploye} from '../repository/userRepo.js';

/**
 * SECTION GENERALE
 * **************************************************************************************
 * **************************************************************************************
 */

/**
 * connexion pour gerer les sessions
 * @param {*} req 
 * @param {*} res 
 */


export const loginLoadAd = async (req, res) => {

    try {
        const id = req.session.user_id
        conn$.query(`
            SELECT *
            FROM user
            WHERE id = ?
            `, [id], (e, r) => {
            let userInfo = r[0]

            res.render('admin/home', { user: userInfo })

        })

    } catch (error) {
        console.log()

    }
}

/**
 * verifier si user est connecter 
 * @param {*} req 
 * @param {*} res 
 */
export const verifLogAd = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }

}

/**
 * SECTION LIST OF 
 * **************************************************************************************
 * **************************************************************************************
 */

/**
 * Function general de get all
 * @param {*} req 
 * @param {*} res 
 * @param {*} tab 
 * @param {*} red 
 */
export const listOf = async (req,res,tab,red)=>{

    try { 

        conn$.query(`select * from ${tab} ORDER BY id DESC`, (e,r)=> {
            res.render(red, { infos:r })
        })
  
         
    } catch (error) {
        console.log(error)
    }
}

/**
 * list des users 
 * @param {*} req 
 * @param {*} res 
 */
export const listOfUser = async (req, res) => {

    try {

        conn$.query(`select * from user ORDER BY id DESC`, (e, r) => {

             conn$.query(`
                    select u.*,a.*
                    from user as u
                    left join address as a
                    on u.id = a.user_id

                `, (er, resu) => {
                res.render('admin/usersList', { infos:r , add: resu})

            })
            
        })


    } catch (error) {
        console.log(error)
    }
}

/**
 * SECTION UPDATE
 * **************************************************************************************
 * **************************************************************************************
 */

/**
 * editer un user 
 * @param {*} req 
 * @param {*} res 
 */
 
export const updateUser = async (req, res)=>{

    const { id } = req.params;
    const {firstname,lastname,address,email,ids}= req.body
    
    conn$.query(`
    UPDATE user
    SET ?
    WHERE id = ?
    `, [{firstname: firstname,
         email: email,
         lastname: lastname,
        }, id]);

    for (let addr of address) {
        let index = ids.shift()
        conn$.query(`
                update address
                SET ? 
                WHERE id = ?
                `, [{addressName:addr}, index])
    }
    res.redirect("/admin/users");  
}


/**
 * editer un livreur
 * @param {*} req 
 * @param {*} res 
 */
export const updateEmploye = async (req,res)=> {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body

    conn$.query(`
    UPDATE deliveryman
    SET ?
    WHERE id = ?
    `, [{
        firstName: firstname,
        email: email,
        lastName: lastname,
    }, id]);
    
    res.redirect("/admin/employes");
}
 /**
  * Recuperer les infos de l'user et son adresse ensuite rediriger vers page edit 
  * @param {*} req 
  * @param {*} res 
  */

export async function update(req, res) {
    const { id } = req.params;
    conn$.query("SELECT * FROM user WHERE id = ?", 
        [id],(err, resul)=>{
            
        conn$.query(`
                    select u.*,a.*
                    from user as u
                    left join address as a
                    on u.id = a.user_id
                    where a.user_id = ?
                `,[id], (er, resu) => {
                    console.log(resu)
            res.render("admin/editUser", { user: resul[0], userAd:resu });
        })
    });   
};

/**
 * SECTION ADD
 * **************************************************************************************
 * **************************************************************************************
 */

/**
 * Ajouter un user 
 * @param {*} req 
 * @param {*} res 
 */
export const addUser = async (req, res) => {
    const { username, password, email, id } = req.body;

    insertUser(username, password, email);
    res.redirect('/admin/home', { msg_succes: "nouveaux utilisateur crée " })
}

/**
 * Ajout de ueser 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

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


/**
 * ajout de livreur 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const registerEmploye = (req,res)=>{
    try {
        //recuperation des name du post et on les mets dans des varible
        let { firstname, lastname, email} = req.body;

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
                !email) {
                return res.render('admin/addEmploye', { msg: 'Tous les champs sont obligatoire' }); 
            } else {

                    insertEmploye(firstname, lastname, email)
                    res.render('admin/addEmploye', { msg_success: "Livreur ajouté" })
            }


        }

    } catch (error) {
        console.log(error)
    }
}

/**
 * SECTION DELETE
 * **************************************************************************************
 * **************************************************************************************
 */

/**
 * function generale de delete 
 * @param {*} req 
 * @param {*} res 
 * @param {*} elt 
 * @param {*} red 
 */

export const deleteElt = async (req, res, elt, red) => {

    const { id } = req.params;
    const result = conn$.query(`
    DELETE FROM ${elt}
    WHERE id = ?
    `, [id]);
    res.redirect(red)
}