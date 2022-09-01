const express = require('express');

const productos = require ('./rutas/productos.js');
const carrito = require ('./rutas/carrito.js');

const app = express();

app.use(express.json());   //ESTAS DOS LINEAS SON NECESARIAS PARA PODER USAR GET, POST, PUT, Y DELETE
app.use(express.urlencoded({ extended: true }));  //TAMBIEN SON PARA QUE FUNCIONE EL REQ.BODY

app.use('/api/productos', productos );
app.use('/api/carrito', carrito );

//app.get('/',express.static(__dirname + './public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const server = app.listen(8080, console.log("Serivor Ok"));

server.on( "Error", err => console.log(` Error en el servidor: ${err} `)); 