//config socket del lado del cliente
const socket = io();
const productsDiv = document.getElementById("products");
const btnAdd = document.getElementById("addBtn");
const formProduct = document.getElementById("formProduct");

socket.emit("mensajeKey", "Hola desde el cliente");

//escucho al server
socket.on("productos", (data) => {
  let div = "";
  data.forEach((producto) => {
    div += `
        <p>Nombre: ${producto.title}</p>
        <p>Id: ${producto.id}</p>
        <p>Precio: ${producto.price}</p>
        <p>Descripcion: ${producto.description}</p>
        <p>Stock: ${producto.stock}</p>
        <p>Code: ${producto.code}</p>
        <button id="btnDelete" type="button" onclick = deleteProduct(${producto.id})>Eliminar</button>
        <hr>`;
  });
  productsDiv.innerHTML = div;
});

function deleteProduct(productoId){
  socket.emit("productoId", productoId)
}

formProduct.addEventListener("submit", (event)=>{
  event.preventDefault();
  let producto = {
    title: formProduct.elements.nombre.value,
    description: formProduct.elements.descripcion.value,
    price: parseInt(formProduct.elements.precio.value),
    code: formProduct.elements.codigo.value,
    category: formProduct.elements.category.value,
    stock: parseInt(formProduct.elements.stock.value)
  }
  socket.emit("newProduct", producto);
  formProduct.reset()
})
