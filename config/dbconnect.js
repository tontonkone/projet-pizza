/**
 * Fichier de connexion a la bd
 * pour se connecter et initialiser mysql 
 * et gerer les erreurs de system de connection  a la bd 
 * 
 */

/**
 * IMPORT ******************************
 * *************************************
 */
/* import mysql from 'mysql';


 const conn$ = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tesresto", 
})
conn$.connect(function(err) {
        if (err) {
        console.error('error connecting: ' + err.stack);
        return;
        }
    
        console.log('connected as id ' + conn$.threadId);
    });
export default conn$ */