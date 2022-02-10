import { fetchData, postData } from "./fetch.js";
import { render } from './render.js'
const socket = io();
const submit = document.getElementById("submit");

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


window.addEventListener("DOMContentLoaded", async ()=>{
    submit.addEventListener("click", createItem);
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
