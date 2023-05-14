const danger = document.getElementById('pop');
const succes = document.getElementById('pop-suc');
const connexion = document.getElementById('connexion');

if(succes || danger){

    if(succes){
        removeData(succes)
    }

    if(danger){
        removeData(danger)
    }
}


const socket = io()

socket.on("client:connecte:ok", () => {
    console.log('Message bien reçu du serveur !')
})

socket.on('con', () => {
    console.log('Hello reçu du serveur')
})

function removeData(data) {
    setTimeout((e) => {  
        data.remove()
    }, 4000);
}
