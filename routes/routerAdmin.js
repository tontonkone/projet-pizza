/**
 * les imports
 */
import session from "express-session";
import { deconnexion, loginVer, loginload, register } from '../controllers/controllerUser.js';
import { isLogOut, isLogOutAd, isLogin, isLoginAd} from '../middleware/auth.js';
import { Router } from 'express';
import {deleteUser, listOfUser, loginLoadAd,update,verifLogAd,updateUser} from '../controllers/controllersAdmin.js'

import { User } from '../models/modelUser.js';


const routerAdmin = Router();

routerAdmin.use(
    session({
        secret: 'secret',
        resave: true,   
        saveUninitialized: true
    })
);

routerAdmin.get('/login',isLogOutAd,(req,res)=>{
    res.render('login')
})
routerAdmin.get('/admin/home', isLoginAd,(req, res)=>{
    loginLoadAd(req,res)
})

routerAdmin.get('/admin/usersList',(req,res)=>{
    listOfUser(req,res)
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


//POST

routerAdmin.post('/admin/addUser/', (req,res)=>{
    addUser()
})

routerAdmin.post('/admin/edit_user/:id', (req,res)=>{
    updateUser(req,res)
})

export default routerAdmin