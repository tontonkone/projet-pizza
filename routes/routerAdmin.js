/**
 * les imports
 */
import session from "express-session";
import { deconnexion, loginVer, loginload, register } from '../controllers/controllerUser.js';
import { isLogOut, isLogOutAd, isLogin, isLoginAd} from '../middleware/auth.js';
import { Router } from 'express';
import {listOfUser, loginLoadAd,verifLogAd} from '../controllers/controllersAdmin.js'

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

export default routerAdmin