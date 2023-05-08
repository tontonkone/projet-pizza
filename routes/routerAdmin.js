/**
 * les imports
 */
import session from "express-session";
import { deconnexion, loginVer, loginload, register } from '../controllers/controllerUser.js';
import { isLogOut, isLogOutAd, isLogin, isLoginAd} from '../middleware/auth.js';
import { Router } from 'express';
import {listOf,listOfUser, loginLoadAd,update,verifLogAd,updateUser,registerAdmin, deleteElt, updateEmploye,registerEmploye} from '../controllers/controllersAdmin.js'
import { getInfo } from "../repository/userRepo.js";


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

// editer user admin
routerAdmin.get('/admin/edit_user/:id',(req,res)=>{
    update(req,res)
})
 

// edit deliveryman
routerAdmin.get('/admin/edit_employe/:id', (req, res) => {
    getInfo(req,res,'deliveryman','admin/editEmploye')
})

//ajout de user
routerAdmin.get('/admin/addUser', (req, res) => {
    res.render('admin/addUser')
})

//ajout de employe
routerAdmin.get('/admin/add_employe', (req, res) => {
    res.render('admin/addEmploye')
})


// del user
routerAdmin.get('/admin/delete_user/:id', (req,res)=>{
    deleteElt(req,res,'user','/admin/users')
})

//del deliveryman 

routerAdmin.get('/admin/delete_employe/:id', (req, res) => {
    deleteElt(req, res, 'deliveryman', '/admin/employes')
})

// list of users
routerAdmin.get('/admin/users', (req, res) => {

    listOfUser(req,res,'user','admin/usersList')
})

// list of deliveryman
routerAdmin.get('/admin/employes', (req, res) => {
    listOf(req,res,'deliveryman','admin/employeList')
})

// list of menu
routerAdmin.get('/admin/menus', (req, res) => {
    listOf(req,res,'menu','admin/menuList')
})
// list of orders
routerAdmin.get('/admin/orders', (req, res) => {
    res.render('admin/orderList')
})
// list of pizza 
routerAdmin.get('/admin/pizzas',(req,res)=> {

    res.render('admin/pizzasList')
})

// list of ingredients
routerAdmin.get('/admin/ingredients', (req, res)=> {

    res.render('admin/ingredientList')
})

// list of promotions
routerAdmin.get('/admin/promotions',(req,res)=> {
    res.render('admin/promotionList')
})



//POST *************************************************************************
//**************************************************************************** */

routerAdmin.post('/admin/add_user',(req,res)=>{
    registerAdmin(req,res)
})

routerAdmin.post('/admin/add_employe', (req, res) => {
    registerEmploye(req, res)
})


routerAdmin.post('/admin/edit_user/:id', (req,res)=>{
    updateUser(req,res)
})

routerAdmin.post('/admin/edit_employe/:id', (req, res) => {
    updateEmploye(req, res)
}) 


 
export default routerAdmin  