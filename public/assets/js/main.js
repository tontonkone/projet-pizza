
const danger = document.getElementById('pop');
const succes = document.getElementById('pop-suc');
const connexion = document.getElementById('connexion');
const element = document.getElementById('textcontent')

if(succes || danger){

    if(succes){
        removeData(succes)
    }

    if(danger){
        removeData(danger)
    }
}


const socket = io()

    
socket.emit('join','roomPlace'); 


socket.on("client:connecte:ok", () => {
    console.log('Message bien reçu du serveur !')
})

socket.on('userConnected', (data) => {
    const div = document.createElement('div')
    div.innerHTML = `<p>${data.name} ${data.lastname} vient de se connecté </p>`
    element.append(div)
})

socket.on('userDeconnect', (data) => {
    const div = document.createElement('div')
    div.innerHTML = `<p>${data.name} ${data.lastname} vient de se deconnecté </p>`
    element.append(div)
})

function removeData(data) {
    setTimeout((e) => {  
        data.remove()
    }, 4000);
}
