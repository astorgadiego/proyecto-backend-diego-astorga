import express from 'express'
//const productos = require ('./rutas/productos.js');
import { router } from './rutas/productos.js';
const productos = router;
//const carrito = require ('./rutas/carrito.js');
import { productosMongoose, carritoMongoose, productosFirebase, carritoFirebase  } from './daos/exportador.js';
import { routercarrito } from './rutas/carrito.js';
const carrito = routercarrito;
const app = express();

app.use(express.json());   //ESTAS DOS LINEAS SON NECESARIAS PARA PODER USAR GET, POST, PUT, Y DELETE
app.use(express.urlencoded({ extended: true }));  //TAMBIEN SON PARA QUE FUNCIONE EL REQ.BODY

app.use('/api/productos', productos );
app.use('/api/carrito', carrito );

app.use ( express.static ( './public' )  )


app.get ( '/', ( req, res)=>{ 
    res.sendFile ( 'index.html', { root:__dirname }  ) 
    }
)

const variableDeEntorno = 3

console.log(variableDeEntorno );

if (variableDeEntorno == 1) {
    const instanciaProductoArchivo = productosMongoose.conectar();
}else if (variableDeEntorno == 2) {
    const instanciaCarritoArchivo = carritoMongoose.conectar();
}else if (variableDeEntorno == 3) {
    const instanciaProductoFireBase = productosFirebase.conectar();
}else if (variableDeEntorno == 4) {
    const instanciaCarritoFireBase = carritoFirebase.conectar();
}else {
    console.log("");
}


const server = app.listen(8080, console.log("Serivor 8080 Ok"));

server.on( "Error", err => console.log(` Error en el servidor: ${err} `)); 