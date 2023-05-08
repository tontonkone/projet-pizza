import conn$ from "../config/dbconnect.js";

// on recupère un element 

export const getByEmail = async (elt) => {

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
        `, [elt], (e, r) => {
        return r[0]
    })

}

export const getInfo = async (req,res,elt,red)=>{
    const { id } = req.params;
    conn$.query(`SELECT * FROM ${elt} WHERE id = ?`, 
        [id],(err, resul)=>{
        res.render(red, { user: resul[0]});
    });

}


export const insertUser = async (firstname, lastname, email, password, address, is_admin = 0) => {
    conn$.query(`
            INSERT INTO user (firstname, lastname, email,password,is_admin,createdate)
            VALUES(?,?,?,?,?, NOW())
            `, [firstname, lastname, email, password, is_admin], (er, resu) => {

        insertTab(resu.insertId, address)
    });
}

export const insertEmploye = async (firstname,lastname,email)=>{
    conn$.query(`
            INSERT INTO deliveryman (firstName, lastName, email,createdate)
            VALUES(?,?,?, NOW())
            `, [firstname, lastname, email]);
}

export const getAll = () => {
    const [all] = conn$.query(` 
        SELECT *
        from user
    `)
    return all
}


export const insertTab = async (id, tab) => {
    for (let t of tab) {
        conn$.query(`
            INSERT INTO address (user_id,addressName)
            VALUES(?,?)
            `, [id, t]);
    }

}
