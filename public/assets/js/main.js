const danger = document.getElementById('pop');
const succes = document.getElementById('pop-suc')

if(succes || danger){

    if(succes){
        removeData(succes)
    }

    if(danger){
        removeData(danger)
    }
}

function removeData(data){
    setTimeout(() => {
        data.remove()
    }, 4000);
}