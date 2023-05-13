import conn$ from "../config/dbconnect.js";

/**
 * insertion DB menu 
 * @param {*} category_id 
 * @param {*} name 
 * @param {*} QuantityStock 
 * @param {*} price 
 */
export const insertProduct = async (category_id,name, QuantityStock,price) => {
    conn$.query(`
            INSERT INTO product (category_id, name, QuantityStock,price)
            VALUES(?,?,?,?)
            `, [category_id,name,QuantityStock,price]);
}
