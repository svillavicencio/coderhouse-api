import { fetchData, postData } from "./fetch.js";
import { render, renderMessages } from './render.js'
const socket = io();
const submit = document.getElementById("submit");
const submitMsg = document.getElementById('submit-messages');

socket.on("new-product",(data)=>{
    if(data.status === "ok"){
        fetchData("/api/productos")
        .then((data)=>{
            render(data);
        })
        .catch(error=>console.error(error));
    } else {
        console.error(data.status)
    }

});

socket.on('messages', function(data) { renderMessages(data); });


function addMessage() {
    const mensaje = {
        email: document.getElementById('email').value,
        date: new Date().toUTCString(),
        msg: document.getElementById('message').value 
    };
    socket.emit('new-message', mensaje);
    return false;
}




window.addEventListener("DOMContentLoaded", async ()=>{
    submit.addEventListener("click", createItem);
    submitMsg.addEventListener('click', addMessage)
    const data = await fetchData("/api/productos");
    render(data);
})

const createItem = async(event)=>{
    event.preventDefault();
    let obj = {
        title:  document.forms[0].title.value,
        price : document.forms[0].price.value,
        thumbnail: document.forms[0].thumbnail.value,
    };
    let response = await postData("/api/productos", obj);

    response != null ? socket.emit("new-product", {status:"ok"}) : socket.emit("new-product", {status:"error"});
};
