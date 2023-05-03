import { get } from 'mongoose';
import { deconnexion, loginVer, loginload, register } from '../controllers/controllerUser.js';
import { isLogOut,isLogin } from '../middleware/auth.js';
import { Router} from 'express';
import session from 'express-session';



const router = Router();


// Express-session
router.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


router.post('/register',isLogOut, (req,res)=>{
    register(req,res)
});


router.post('/login',(req,res,next)=>{
    loginVer(req,res,next);
})

router.get('/login',isLogOut,(req,res)=>{
    res.render('login')
})
router.get('/',isLogOut, (req,res)=>{

    res.render('register')
})
router.get('/deconnexion',(req,res)=> {
    deconnexion(req,res);
})

router.get('/home',isLogin,(req,res)=> loginload(req,res))
export default router