const ProductManager = require("./ProductManager.js");
let productManager = new ProductManager;

let persistirProductos = async () => {
    let producto1 = await productManager.addProduct("Pera", "1kg", 400, "pera.png", "GA78RE", 60);
    let producto2 = await productManager.addProduct("Manzana", "2kg", 400, "manzana.png", "RE95FD", 60);
    let producto4 = await productManager.addProduct("Naranja", "5kg", 400, "naranja.png", "WQ65HG", 60);
    let producto5 = await productManager.addProduct("Fresa", "8kg", 400, "fresa.png", "PI65GH", 60);
    let producto6 = await productManager.addProduct("Melon", "3kg", 400, "melon.png", " QF21RW", 60);
    let producto7 = await productManager.addProduct("Kiwi", "4kg", 400, "kiwi.png", "HG95SAD", 60);
    let producto8 = await productManager.addProduct("Morron", "7kg", 400, "morron.png", "QW12PO", 60);
    let producto9 = await productManager.addProduct("Zanahoria", "2kg", 400, "zanahoria.png", "ZZ98WE", 60);
}

let obtenerProductos = async() => {
    let productos = await productManager.getProductos();
}

let obtenerProductoById = async(id) => {
    let producto = await productManager.getProductoById(id)
}
let actualizarProductoById = async(id, data) => {
    let producto = await productManager.updateProduct(id, data)
}

let elimiarProductoById = async(id) =>{
    let producto = await productManager.deleteProduct(id)
}
//    let producto =  {title:"Pera", description: "1kg", precio: 400,thumbnail: "pera.png",code: "GA78RE", stock: 60}
//    let producto1 =  {title:"Manzana", description:"2kg", precio: 400,thumbnail: "manzana.png",code: "RE95FD", stock: 60}
//    let producto2 =  {title:"Naranja", description:"5kg", precio: 400,thumbnail: "naranja.png",code:"WQ65HG", stock: 60}
//    let producto3 =  {title:"Fresa", description:"8kg", precio: 400,thumbnail: "fresa.png",code: "PI65GH", stock: 60}
//    let producto4 =  {title:"Melon", description:"3kg", precio: 400,thumbnail: "melon.png",code: " QF21RW", stock: 60}
//    let producto5 =  {title:"Kiwi", description:"4kg", precio: 400,thumbnail: "kiwi.png",code: "HG95SAD", stock: 60}
//    let producto6 =  {title:"Morron", description:"7kg", precio: 400,thumbnail: "morron.png",code: "QW12PO", stock: 60}
//    let producto7 =  {title:"Zanahoria", description:"2kg", precio: 400,thumbnail: "zanahoria.png",code: "ZZ98WE", stock: 60}

let productoActualizado = {
    title: "Vaso",
    description: "Grande",
    price: 300,
    thumbnail: "vaso.png",
    code: "PG97HD",
    stock: 300
    }
// persistirProductos();
obtenerProductos();
// obtenerProductoById(4);
// actualizarProductoById(3, productoActualizado)
// elimiarProductoById(1);
