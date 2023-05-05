/**
 * les imports
 */
import session from "express-session";
import { deconnexion, loginVer, loginload, register } from '../controllers/controllerUser.js';
import { isLogOut, isLogOutAd, isLogin, isLoginAd} from '../middleware/auth.js';
import { Router } from 'express';
import {deleteUser, listOf, loginLoadAd,update,verifLogAd,updateUser, registerAdmin} from '../controllers/controllersAdmin.js'


const routerAdmin = Router();

routerAdmin.use(
    session({
        secret: 'secret',
        resave: true,   
        saveUninitialized: true
    })
);

//GET 

routerAdmin.get('/login',isLogOutAd,(req,res)=>{
    res.render('login')
})
routerAdmin.get('/admin/home', isLoginAd,(req, res)=>{
    loginLoadAd(req,res)
})

routerAdmin.get('/admin/edit_user/:id',(req,res)=>{
    update(req,res)
})

routerAdmin.get('/admin/addUser', (req, res) => {
    res.render('admin/addUser')
})

routerAdmin.get('/admin/delete_user/:id', (req,res)=>{
    deleteUser(req,res)
})

routerAdmin.get('/admin/users', (req, res) => {
    listOf(req, res,'user','admin/usersList')
})

routerAdmin.get('/admin/employes', (req, res) => {
    listOf(req,res,'deliveryman','admin/employeList')
})

routerAdmin.get('/admin/menus', (req, res) => {
    listOf(req,res,'menu','admin/menuList')
})
routerAdmin.get('/admin/orders', (req, res) => {
    res.render('admin/orderList')
})

routerAdmin.get('/admin/pizzas',(req,res)=> {

    res.render('admin/pizzasList')
})

routerAdmin.get('/admin/ingredients', (req, res)=> {

    res.render('admin/ingredientList')
})

routerAdmin.get('/admin/promotions',(req,res)=> {
    res.render('admin/promotionList')
})

//POST

routerAdmin.post('/admin/add_user',(req,res)=>{
    registerAdmin(req,res)
})

routerAdmin.post('/admin/addUser/', (req,res)=>{
    addUser()
})

routerAdmin.post('/admin/edit_user/:id', (req,res)=>{
    updateUser(req,res)
})

export default routerAdmin