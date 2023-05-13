import conn$ from "../config/dbconnect.js";

// on recupère un element 

export const getByEmail = async (elt) => {

    conn$.query(`
            SELECT *
            FROM user
            WHERE email = ?
            `, [elt])
}


/**
 * Obtenir les infos par id 
 * @param {*} req 
 * @param {*} res 
 * @param {*} elt 
 * @param {*} red 
 */
export const getInfo = async (req,res,elt,red)=>{
    const { id } = req.params;
    conn$.query(`SELECT * FROM ${elt} WHERE id = ?`, 
        [id],(err, resul)=>{
        res.render(red, { user: resul[0]});
    });

}
/**
 * insertion de user 
 * @param {string} firstname 
 * @param {string} lastname 
 * @param {string} email 
 * @param {*} password 
 * @param {string} address 
 * @param {*} is_admin 
 */

export const insertUser = async (firstname, lastname, email, password, address, is_admin = 0) => {
    conn$.query(`
            INSERT INTO user (firstname, lastname, email,password,is_admin,createdate)
            VALUES(?,?,?,?,?, NOW())
            `, [firstname, lastname, email, password, is_admin], (er, resu) => {

        insertTab(resu.insertId, address)
    });
}

/**
 * Insertion d'employé 
 * @param {*} firstname 
 * @param {*} lastname 
 * @param {*} email 
 */
export const insertEmploye = async (firstname,lastname,email)=>{
    conn$.query(`
            INSERT INTO deliveryman (firstName, lastName, email,createdate)
            VALUES(?,?,?, NOW())
            `, [firstname, lastname, email]);
}
/**
 * Insertion dans adresse
 * @param {*} id 
 * @param {*} tab 
 */
export const insertTab = async (id, tab) => {
    for (let t of tab) {
        conn$.query(`
            INSERT INTO address (user_id,addressName)
            VALUES(?,?)
            `, [id, t]);
    }

}
