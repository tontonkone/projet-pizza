/**
 * les imports
 */
import session from "express-session";
import { deconnexion, loginVer, loginload, register } from '../controllers/controllerUser.js';
import { isLogOut, isLogin,isLoginAd } from '../middleware/auth.js';
import { Router } from 'express';
import {loginLoadAd,verifLogAd} from '../controllers/controllersAdmin.js'



const routerAdmin = Router();

routerAdmin.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

routerAdmin.get('/admin/home', isLoginAd,(req, res)=>{
    loginLoadAd(req,res)
})



export default routerAdmin