/**
 * fichier de configuration du serveur et gestion d'erreur
 * et lancment du serveur
 * 
 */

/**
 * IMPORT ******************************
 * *************************************
 */
import { verifRoute } from './config/valid.js';
import routerUser from './routes/routerUser.js'
import passport from 'passport'
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import './config/dbconnect.js';
import session from 'express-session';
import mongoose from 'mongoose';
import routerAdmin from './routes/routerAdmin.js';



const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/dbnew', {useNewUrlParser: true})
    .then(() => console.log('Connected!'))
    .catch(er =>console.log(er));
/**
 * APP USE ******************************
 * ********************************
 */

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


app.use(express.static('public'))


app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(routerUser)
app.use(routerAdmin)
// Express-session


/**
 * APP SET ******************************
 * *************************************
 */
app.set('views', './views')
app.set('view engine', 'ejs');


app.listen(3000,()=> console.log('Server start 3000'))