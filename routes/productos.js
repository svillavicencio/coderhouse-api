const express = require('express');
const router = express.Router();
const products = require('../api/Products');

router.get('/', (req, res)=>{
    res.send(JSON.stringify(products.getItems()));
});

router.get('/:id', (req, res)=>{
    res.send(JSON.stringify(products.getItemById(parseInt(req.params.id))));
})

router.post('/', (req, res)=>{

    // <input type="text" name="title", placeholder="Nombre del producto" required>
    // <input type="number" name="price", placeholder="Precio" required>
    // <input type="text" name="thumbnail", placeholder="URL Imagen" required></input>

    if(req.body.title !== undefined && req.body.price !== undefined && req.body.thumbnail !== undefined){
        let item = req.body;
        res.status(200).send(JSON.stringify(products.addItem(item)));
    }
})

router.put('/:id', (req, res)=>{
    if(req.body.title !== undefined && req.body.price !== undefined && req.body.thumbnail !== undefined){
        products.updateItemById(req.body, parseInt(req.params.id));
        res.send(`id: ${req.params.id} actualizado`)
    }
})

router.delete('/:id', (req, res)=>{
    products.deleteItemById(parseInt(req.params.id));
    res.send('Item eliminado')
})

module.exports = router;
