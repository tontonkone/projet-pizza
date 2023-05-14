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
/**
 * get produit par id 
 * @param {*} req 
 * @param {*} res 
 * @param {*} elt 
 * @param {*} red 
 */

export const getProduct = async (req, res, elt, red) => {
    const { id } = req.params;
    conn$.query(`SELECT * FROM product WHERE id = ?`,
        [id], (err, resul) => {
            res.render(red, { product: resul[0], element: elt });
        });

}


export const updateProduct = async (req, res,red) => {
    const { id } = req.params;
    const { name, price, QuantityStock } = req.body

    conn$.query(`
    UPDATE product
    SET ?
    WHERE id = ?
    `, [{
        name: name,
        price: price,
        QuantityStock: QuantityStock,
    }, id]);

    res.redirect(red);
}