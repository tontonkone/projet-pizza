/**
 * fichier de configuration du serveur et gestion d'erreur
 * et lancment du serveur
 * 
 */

/**
 * IMPORT ******************************
 * *************************************
 */
import routerUser from './routes/routerUser.js'
import bodyParser from 'body-parser'
import express from 'express';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import './config/dbconnect.js';



const app = express();


/**
 * APP USE ******************************
 * *************************************
 */
app.use(cors());
app.use((err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || " Internal Server Error";
    res.status(err.statusCode).json({
        message:err.message,
    })
})
app.use(routerUser)
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))

/**
 * APP SET ******************************
 * *************************************
 */
app.set('views', './views')
app.set('view engine', 'ejs');








app.listen(3000,()=> console.log('Server start 3000'))