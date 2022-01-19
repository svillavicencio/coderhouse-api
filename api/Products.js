class Products {
    constructor(){
        this.items = [];
    }

    static id = 0;

    addItem(item){
        
        let newItem = {
            id: Products.id++,
            ...item,
        }

        this.items.push(newItem);
        return newItem;
    }

    getItems(){
        return this.items;
    }

    getItemById(id){
        console.log(this.items.find(item => item.id === id))
        return this.items.find(item => item.id === id) || { error: `producto no encontrado`} ;
    }

    updateItemById(newItem, id){
        const index = this.items.indexOf(this.getItemById(id));
        if(index < 0) return { error: `producto no encontrado`}

        this.items[index] = {id: id , ...newItem};

        console.log(`item actualizado`)
    }

    deleteItemById(id){
        this.items.splice(this.items.indexOf(this.getItemById(id)), 1);
        console.log('Elemento eliminado')
    }

}

module.exports = new Products();