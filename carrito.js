const express = require ( 'express' );
const timestamp = require ('./timestamp');
const data = require ('fs');

const { Router } = express;

const router = Router();

const carrito = [];

let carritosDisponibles

function crearCarrito(params, objeto) {

    let NuevoCarrito = {
        id: params,
        timestamp: timestamp,
        productos : objeto
    }
    carrito.push(NuevoCarrito)
    return " El id del carrito es: " + params  
}

router.get ('/', (req, res) => { 
    carritosDisponibles = JSON.parse( data.readFileSync( 'archivos/carritos.txt','utf-8' ))  //PASA DE JSON A JS 
    console.log(carritosDisponibles);
    res.send(carritosDisponibles);
    //res.send (crearCarrito( 1, prueba )) 
} )

router.post ('/', (req, res) => { 
    let prueba = { nombre: "Diego", edad: 45 }

    let id = crearCarrito( 1, req.body )
    let arraySTRING= JSON.stringify( carrito )  //PASA DE JS A JSON
    data.writeFileSync(  'archivos/carritos.txt', `${ arraySTRING }` ) 
    res.status(201).send(id) 
})

router.get('/:id/productos', (req,res) => { 
    let { id } = req.params;

    carritosDisponibles = JSON.parse( data.readFileSync( 'archivos/carritos.txt','utf-8' ))  //PASA DE JSON A JS
    const carritosSolicitado = [];
    carritosSolicitado.push(carritosDisponibles[id - 1])
    let productosEnCarrito
    //console.log(productos[1]);

                if(isNaN( id )){
                    res.status(400).send({error: 'El parámetro no es un número'});
                    return
                }
                if(id > carritosDisponibles.length){
                    res.status(400).send({error: 'Producto no enontrado'});
                    return
                }
    carritosSolicitado.forEach( el => {
        productosEnCarrito = el.productos 
    } )
    console.log( carritosSolicitado );
    console.log("Los productos ene este carrito son " , productosEnCarrito); //ES UN ARRAY
    
    res.send (  productosEnCarrito );
    
})

//Para incorporar productos al carrito por su id de producto
router.post('/:id/productos',(req, res) => { 
    let { id } = req.params;
    let carritoAmodificar ;
    let productosEnCarrito

    carritosDisponibles = JSON.parse( data.readFileSync( 'archivos/carritos.txt','utf-8' ))  //PASA DE JSON A JS
    //carritoAmodificar.push( carritosDisponibles[ id - 1 ] )
    carritoAmodificar = carritosDisponibles[id-1]
    console.log("inicio",carritoAmodificar);
    console.log("segundo",carritoAmodificar.productos);
    // carritoAmodificar.forEach( el => {
    //     productosEnCarrito = el.productos 
    // } )
    carritoAmodificar.productos.push( req.body )
    console.log("medio",carritoAmodificar);
    // carritoAmodificar.forEach( el => {
    //     el.productos= productosEnCarrito 
    // } )
    // //console.log("marca",carritoAmodificar);
    carritosDisponibles[ id - 1 ] = carritoAmodificar
    console.log("tercero",carritosDisponibles);
    // console.log("marca",carritosDisponibles);
    let arraySTRING= JSON.stringify( carritosDisponibles )  //PASA DE JS A JSON
    data.writeFileSync(  'archivos/carritos.txt', `${ arraySTRING }` ) 
    // console.log("hola", productosEnCarrito);
    // console.log(carritoAmodificar);
    res.send(`producto agregado al carrito numero ${id}`)
})

router.delete( '/:id', (req, res) => { 
    let { id } = req.params;
    let carritoAborrar
    
    carritosDisponibles = JSON.parse( data.readFileSync( 'archivos/carritos.txt','utf-8' ))  //PASA DE JSON A JS
    console.log("todo:",carritosDisponibles);
    carritoAborrar = carritosDisponibles[id-1]
    console.log("borar:",carritoAborrar);
    carritosDisponibles.splice( id-1, 1 )
    console.log("despues de borrar:", carritosDisponibles);
    
    carritosDisponibles.forEach( elem => {  elem.id = elem.id - 1 })
    
    // console.log("borrando", carritosDisponibles);
    let carritoSTRING= JSON.stringify( carritosDisponibles )  //PASA DE JS A JSON
    data.writeFileSync(  'archivos/carritos.txt', `${ carritoSTRING }` )
    
    res.status(200).send("Producto Eliminado Exitosamente");
} )


//Eliminar un producto del carrito por su id de carrito y de producto
router.delete('/:id/productos/:id_prod',(req, res) => { 
    let { id } = req.params
    res.status(200).send(`Producto Eliminado Exitosamente DEL CARRITO de ID:  ${id}`);
})



module.exports = router