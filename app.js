/**
 * fichier de configuration du serveur et gestion d'erreur
 * et lancment du serveur
 * 
 */

/**
 * IMPORT ******************************
 * *************************************
 */
import { Server } from "socket.io";
import routerUser from './routes/routerUser.js'
import express from 'express';
import './config/dbconnect.js';
import session from 'express-session';
import routerAdmin from './routes/routerAdmin.js';
import { createServer } from 'http';
import Emitter from 'events'



const app = express();

const server = createServer(app);
const io = new Server(server);
global.io  = io

/**
 * APP USE ******************************
 * **************************************
 */



app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


app.use(express.static('public'))



// Express-session


/**
 * APP SET ******************************
 * *************************************
 */
app.set('views', './views')
app.set('view engine', 'ejs');



/**
 * SOCKET **************************************************************************************************************
 * *********************************************************************************************************************
 */

// gestionnaire d'event 
const eventEmit = new Emitter();

app.set('eventEmit', eventEmit);

console.log(eventEmit)

io.on('connection', socket => {
    console.log('un client vient de se connecter avec socket.id=', socket.id)
    
    socket.emit('client:connecte:ok');

})

eventEmit.on('register',(data)=>{
    //Tout d'abord, le socket.to()crée une propriété sur le socket nommé _roomsqui est un tableau de noms de pièces. Vous pouvez voir tout le code en contexte ici dans le référentiel Github , mais voici la partie pertinente pour.to() :
})

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(routerUser)
app.use(routerAdmin)

server.listen(3000,()=> console.log('Server start 3000'));
