import conn$ from "../config/dbconnect.js";

// on recupère un element 

export const getByEmail = async (elt)=>{

         conn$.query(`
            SELECT *
            FROM user
            WHERE email = ?
            `, [elt])
}

export const getById = async (elt) => {
        conn$.query(`
        SELECT *
        FROM user
        WHERE id = ?
        `, [elt], (e,r)=>{
            return r[0]
        })

}


export const insertUser = async (firstname, lastname, email, password, address,is_admin)=>{
    conn$.query(`
            INSERT INTO user (firstname, lastname, email,password,address,is_admin,createdate)
            VALUES(?,?,?,?,?,?, NOW())
            `, [firstname, lastname, email, password, address,is_admin]);
}

export const getAll = ()=>{
    const [all] = conn$.query(`
        SELECT *
        from user
    `)
    return all
}

 
