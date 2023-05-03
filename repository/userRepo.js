import conn$ from "../config/dbconnect.js";

// on recupère un element 

export const getByEmail = async (elt)=>{

         conn$.query(`
            SELECT *
            FROM users
            WHERE email = ?
            `, [elt])
}

export const getById = async (elt) => {
        conn$.query(`
        SELECT *
        FROM users
        WHERE email = ?
        `, [elt], (e,r)=>{
            console.log('vv')
        })


}


export const insertUser = async (username, password, email)=>{
    conn$.query(`
            INSERT INTO users (name, password, email)
            VALUES(?,?,?)
            `, [username, password, email]);
}


