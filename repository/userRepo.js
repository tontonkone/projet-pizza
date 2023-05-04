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
        WHERE id = ?
        `, [elt], (e,r)=>{
            return r[0]
        })

}


export const insertUser = async (username, password, email)=>{
    conn$.query(`
            INSERT INTO users (name, password, email)
            VALUES(?,?,?)
            `, [username, password, email]);
}

export const getAll = ()=>{
    const [all] = conn$.query(`
        SELECT *
        from users
    `)
    return all
}


