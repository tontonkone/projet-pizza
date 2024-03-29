/**
 * les imports
 */
import session from "express-session";
import { deconnexion, loginVer, loginload, register } from '../controllers/controllerUser.js';
import { isLogOut, isLogOutAd, isLogin, isLoginAd} from '../middleware/auth.js';
import { Router } from 'express';
import { listOfAll, loginLoadAd,update,updateUser,registerAdmin, deleteElt, updateEmploye,registerEmploye, listOfThings, addAllElts} from '../controllers/controllersAdmin.js'
import { getInfo } from "../repository/userRepo.js";
import { getProduct, updateProduct } from "../repository/productRepo.js";


const routerAdmin = Router();

routerAdmin.use(
    session({ 
        secret: 'secret',
        resave: true,   
        saveUninitialized: true
    })
);
//GET 

// connexion
routerAdmin.get('/login',isLogOutAd,(req,res)=>{
    res.render('login')
})

// connexion admin
routerAdmin.get('/admin/home', isLoginAd,(req, res)=>{
    loginLoadAd(req,res)
})

/**
 * ROUTER EDIT************************************************************************
 * ***********************************************************************************
*/

// editer user admin
routerAdmin.get('/admin/edit_user/:id',(req,res)=>{
    update(req,res)
})
 

// edit deliveryman
routerAdmin.get('/admin/edit_employe/:id', (req, res) => {
    getInfo(req,res,'deliveryman','admin/editEmploye')
})

// edit menu
routerAdmin.get('/admin/edit_menu/:id', (req, res) => {
    getProduct(req, res, 'menu', 'admin/editGroup')
})

// edit pizza
routerAdmin.get('/admin/edit_pizza/:id', (req, res) => {
    getProduct(req, res, 'pizza', 'admin/editGroup')
})

// edit desserts
routerAdmin.get('/admin/edit_dessert/:id', (req, res) => {
    getProduct(req, res, 'dessert', 'admin/editGroup')
})

// edit boissons
routerAdmin.get('/admin/edit_boisson/:id', (req, res) => {
    getProduct(req, res, 'boisson', 'admin/editGroup')
})


/**
 * ROUTER AJOUT *********************************************************************
 * ***********************************************************************************
*/
//ajout de user
routerAdmin.get('/admin/addUser', (req, res) => {
    res.render('admin/addUser')
})

//ajout de employe
routerAdmin.get('/admin/add_employe', (req, res) => {
    res.render('admin/addEmploye')
})

//ajout menu
routerAdmin.get('/admin/add_menu', (req, res) => {
    res.render('admin/addGroup',{info: 'menu',id :71})
})

//ajout pizza
routerAdmin.get('/admin/add_pizza', (req, res) => {
    res.render('admin/addGroup', { info: 'pizza', id:70 })
})

//ajout boisson
routerAdmin.get('/admin/add_boisson', (req, res) => {
    res.render('admin/addGroup', { info: 'boisson', id:73})
})

//ajout dessert
routerAdmin.get('/admin/add_dessert', (req, res) => {
    res.render('admin/addGroup', { info: 'dessert', id:72 })
})

/**
 * ROUTER DEL ************************************************************************
 * ***********************************************************************************
*/
// del user
routerAdmin.get('/admin/delete_user/:id', (req,res)=>{
    deleteElt(req,res,'user','/admin/users')
})

//del deliveryman 

routerAdmin.get('/admin/delete_employe/:id', (req, res) => {
    deleteElt(req, res, 'deliveryman', '/admin/employes')
})

//del pizzas 

routerAdmin.get('/admin/delete_pizza/:id', (req, res) => {
    deleteElt(req, res, 'product', '/admin/pizzas')
})

// del menu 
routerAdmin.get('/admin/delete_menu/:id', (req, res) => {
    deleteElt(req, res, 'product', '/admin/menus')
})

// del desserts 
routerAdmin.get('/admin/delete_dessert/:id', (req, res) => {
    deleteElt(req, res, 'product', '/admin/desserts')
})

// del boissons 

routerAdmin.get('/admin/delete_boisson/:id', (req, res) => {
    deleteElt(req, res, 'product', '/admin/boissons')
})

// del ingredient

routerAdmin.get('/admin/delete_ingredient/:id', (req, res) => {
    deleteElt(req, res, 'product', '/admin/ingredients')
})



/**
 * ROUTER LIST ************************************************************************
 * ***********************************************************************************
*/

// list of users
routerAdmin.get('/admin/users', (req, res) => {

    listOfAll(req,res,'user','address','admin/usersList')
})

// list of deliveryman
routerAdmin.get('/admin/employes', (req, res) => {
    listOfAll(req,res,'deliveryman','','admin/employeList')
})

// list of menu
routerAdmin.get('/admin/menus', (req, res) => {
    listOfThings(req, res, 'category', 'product','admin/listGroup','menu')
})
// list of pizza 
routerAdmin.get('/admin/pizzas', (req, res) => {

    listOfThings(req, res, 'category', 'product', 'admin/listGroup', 'pizza')
})

//list of dessert

routerAdmin.get('/admin/desserts', (req, res) => {

    listOfThings(req, res, 'category', 'product', 'admin/listGroup', 'dessert')
})

// list of boissons 

routerAdmin.get('/admin/boissons', (req, res) => {

    listOfThings(req, res, 'category', 'product', 'admin/listGroup', 'boisson')
})


// list of orders
routerAdmin.get('/admin/orders', (req, res) => {
    res.render('admin/orderList')
})

// list of ingredients
routerAdmin.get('/admin/ingredients', (req, res) => {

    listOfThings(req, res, 'ingredient', '', 'admin/listGroup', 'ingredient')
})


// list of promotions
routerAdmin.get('/admin/promotions',(req,res)=> {
    res.render('admin/promotionList')
})



//POST *************************************************************************
//**************************************************************************** */

/**
 * post add *******************************************************
 * ****************************************************************
 */

routerAdmin.post('/admin/add_user', (req, res) => {
    registerAdmin(req, res)
})

routerAdmin.post('/admin/add_employe', (req, res) => {
    registerEmploye(req, res)
})

routerAdmin.post('/admin/add_menu', (req, res) => {
    addAllElts(req, res, '/admin/menus')
})

routerAdmin.post('/admin/add_pizza', (req, res) => {
    addAllElts(req, res, '/admin/pizzas')
})

routerAdmin.post('/admin/add_boisson', (req, res) => {
    addAllElts(req, res, '/admin/boissons')
})
routerAdmin.post('/admin/add_dessert', (req, res) => {
    addAllElts(req, res, '/admin/desserts')
})
/**
 * post editer *******************************************************
 * ****************************************************************
 */

routerAdmin.post('/admin/edit_user/:id', (req,res)=>{
    updateUser(req,res)
})

routerAdmin.post('/admin/edit_employe/:id', (req, res) => {
    updateEmploye(req, res)
}) 

routerAdmin.post('/admin/edit_menu/:id', (req, res) => {
    updateProduct(req, res,'/admin/menus')
}) 

routerAdmin.post('/admin/edit_pizza/:id', (req, res) => {
    updateProduct(req, res, '/admin/pizzas')
})

routerAdmin.post('/admin/edit_dessert/:id', (req, res) => {
    updateProduct(req, res, '/admin/desserts')
})
routerAdmin.post('/admin/edit_dessert/:id', (req, res) => {
    updateProduct(req, res, '/admin/desserts')
})

 
export default routerAdmin  