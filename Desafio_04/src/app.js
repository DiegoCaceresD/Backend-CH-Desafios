import express from "express";
import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'
import __dirname from "./utils.js";
import  handlebars  from "express-handlebars";
import viewRouter from './routes/view.router.js'
import { Server } from 'socket.io'
import ProductManager from "./ProductManager.js";
const app = express();
const PORT = 8080;

const productManager = new ProductManager();

//Preparo al servidor para que pueda trabajar con archivos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname +'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

const httpServer = app.listen(PORT, () => {
  console.log(`Server run on port: ${PORT}`);
});

// declaracion del router
app.use('/', viewRouter);

//instanciamos socket
const socketServer = new Server(httpServer);

//abro canal de comunicacion
socketServer.on('connection', async (socket) =>{
  console.log("Nuevo Cliente conectado id:" , socket.id);
  //obtengo los productos
  const productos = await productManager.getProductos();

  //delete product by id
  socket.on('productoId', async (productoId)=>{
    try {
      await productManager.deleteProduct(productoId)
    } catch (error) {
      console.log("error al borra producto:", error);
    }
  })

  //addProducto by id
  socket.on('newProduct', async (newProduct)=>{
    try {
      await productManager.addProduct(newProduct)
    } catch (error) {
      console.log("error al añadir nuevo producto: ", error);
    }
  })

  socket.emit('productos', JSON.parse(productos));
})