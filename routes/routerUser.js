import { get } from 'mongoose';
import { deconnexion, loginVer, loginload, register } from '../controllers/controllerUser.js';
import { isLogOut,isLogin } from '../middleware/auth.js';
import { Router} from 'express';
import session from 'express-session';
import { User } from '../models/modelUser.js';



const routerUser = Router();


// Express-session
routerUser.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


routerUser.post('/register',isLogOut, (req,res)=>{
    register(req,res)
});


routerUser.post('/login',(req,res,next)=>{
    loginVer(req,res,next);
})

routerUser.get('/login',isLogOut,(req,res)=>{
    res.render('login')
})
routerUser.get('/',isLogOut, (req,res)=>{

    res.render('register')
})


routerUser.get('/register',(req,res)=>{
    res.render('register')
})
routerUser.get('/deconnexion',(req,res)=> {
    deconnexion(req,res);
})

routerUser.get('/home',isLogin,(req,res)=> loginload(req,res))

export default routerUser 