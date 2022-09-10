//const express = require ( 'express' );
import express from 'express'
//const data = require ('fs');
import * as data from 'fs'

//const fncarrito = require ('../logica/carrito_funciones.js')
import crearCarrito , { carrito } from '../logica/carrito_funciones.js'
const { Router } = express;

export const routercarrito = Router();


let carritosDisponibles

//MUESTRA TODOS LOS CARRITOS DISPONIBLES
routercarrito.get ('/', (req, res) => { 
    carritosDisponibles = JSON.parse( data.readFileSync( 'archivos/carritos.txt','utf-8' ))  //PASA DE JSON A JS 
    console.log(carritosDisponibles);
    res.send(carritosDisponibles);
    //res.send (crearCarrito( 1, prueba )) 
} )

//CREA UN CARRITO Y DEVUELVE SU ID

routercarrito.post ('/', (req, res) => { 
    let prueba = { nombre: "Diego", edad: 45 }
    // let data= data.readFileSync( 'archivos/carritos.txt','utf-8' )
    // console.log(  );
    if ( data.readFileSync( 'archivos/carritos.txt','utf-8' )  ===  '' ) {
        console.log("ACA NO HABIA NADA");
        let id = crearCarrito( 1, req.body )
        let arraySTRING= JSON.stringify( carrito )  //PASA DE JS A JSON
        //console.log("SOY YO?", carrito);
        data.writeFileSync(  'archivos/carritos.txt', `${ arraySTRING }` ) 
        res.status(201).send(id)
    }
    else{
        console.log("ACA SI HAABIA ALGO.");
        let ultimoid = 0;
        carritosDisponibles = JSON.parse(  data.readFileSync( 'archivos/carritos.txt','utf-8' )); //PASA DE JSON A JS

        carritosDisponibles.forEach(element => {
            ultimoid = element.id
            console.log(element.id);
        });
        let id = crearCarrito( ultimoid + 1 , req.body )
        let arraySTRING= JSON.stringify( carrito )  //PASA DE JS A JSON
        data.writeFileSync(  'archivos/carritos.txt', `${ arraySTRING }` )
        res.status(201).send(id)
    }

    // let id = fncarrito.crearCarrito( 1, req.body )
    // let arraySTRING= JSON.stringify( fncarrito.carrito )  //PASA DE JS A JSON
    // //console.log("SOY YO?", carrito);
    // data.writeFileSync(  'archivos/carritos.txt', `${ arraySTRING }` ) 
    // res.status(201).send(id) 
})

//LISTA TODOS LOS PRODUCTOS GUARDADOS EN EL CARRITO

routercarrito.get('/:id/productos', (req,res) => { 
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
//INCORPORA PRODUCTOS AL CARRITO POR SU ID DE PRODUCTO  
routercarrito.post('/:id/productos',(req, res) => { 
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
    
    res.send(`producto agregado al carrito numero ${id}`)
})

//VACIA UN CARRITO Y LO ELIMINA

routercarrito.delete( '/:id', (req, res) => { 
    let { id } = req.params;
    let carritoAborrar
    
    carritosDisponibles = JSON.parse( data.readFileSync( 'archivos/carritos.txt','utf-8' ))  //PASA DE JSON A JS
    //console.log("borar:",carritoAborrar);
    carritosDisponibles.splice( id-1, 1 )
    //console.log("despues de borrar:", carritosDisponibles);
    
    carritosDisponibles.forEach( elem => {  elem.id = elem.id - 1 })
    
    // console.log("borrando", carritosDisponibles);
    let carritoSTRING= JSON.stringify( carritosDisponibles )  //PASA DE JS A JSON
    data.writeFileSync(  'archivos/carritos.txt', `${ carritoSTRING }` )
    
    res.status(200).send("Producto Eliminado Exitosamente");
} )


//ELIMINA UN PRODUCTO DEL CARRITO POR ID DE CARRITO Y DE PRODUCTO
routercarrito.delete('/:id/productos/:id_prod',(req, res) => { 
    
    let { id , id_prod } = req.params
    console.log( id_prod );
    carritosDisponibles = JSON.parse( data.readFileSync( 'archivos/carritos.txt','utf-8' ))  //PASA DE JSON A JS
    console.log( "viejo",carritosDisponibles[1] );
    carritosDisponibles[ id -1 ].productos.splice( id_prod - 1  , 1 )
    carritosDisponibles[ id -1 ].productos.forEach ( prod => {
             prod.id = prod.id -1
     } )
    console.log( "nuevo",carritosDisponibles[1] );
    let carritoSTRING= JSON.stringify( carritosDisponibles )  //PASA DE JS A JSON
    console.log(carritoSTRING);
    data.writeFileSync(  'archivos/carritos.txt', `${ carritoSTRING }` )

    res.status(200).send(`Producto Eliminado Exitosamente DEL CARRITO de ID:  ${id}`);
})



//module.exports = routercarrito