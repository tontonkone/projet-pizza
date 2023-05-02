import { register } from '../controllers/controllerUser.js';
import { Router} from 'express';



const router = Router()

router.post('/register', (req,res)=>{
    register(req,res)
});
router.get('/', (req,res)=>{

    res.render('register')
})


export default router