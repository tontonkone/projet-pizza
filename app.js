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


io.on('connection', socket => {
    console.log('un client vient de se connecter avec socket.id=', socket.id)
    
    socket.on('join',(room)=>{
        console.log(room)
        socket.join(room)

    
    })
    socket.emit('client:connecte:ok');

})

eventEmit.on('userConnected',(data)=>{
     io.to('roomPlace').emit('userConnected',data)
})

eventEmit.on('userDeconnect', (data) => {
    io.to('roomPlace').emit('userDeconnect',data)
})



app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(routerUser)
app.use(routerAdmin)

server.listen(3000,()=> console.log('Server start 3000'));
