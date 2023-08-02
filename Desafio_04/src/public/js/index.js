//config socket del lado del cliente
const socket = io();

socket.emit('mensajeKey', "Hola desde el cliente");

//escucho al server
socket.on('msg02', data =>{
    console.log(data);
})