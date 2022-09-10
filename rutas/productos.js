//-------IMPORTANTE PARA PODER USAR EL REQUIRE CON EL TYPE: MODULE
import { createRequire } from 'module';
const require = createRequire ( import.meta.url )

//const { hora } = require('console');
const express = require ( 'express' );
import { hora } from '../timestamp.js';
//const hora = require ('../hora');
const data = require ('fs');

const { Router } = express;

export const router = Router();

// const productosDisponibles =[
//     {
//         id: 1,
//         hora: Date.now(),
//         titulo: "Brocoli",
//         descripcion: "Verdura",
//         codigo: "producto1",
//         imagen : "##",
//         precio : 45,
//         stock: 10
//     },
//     {
//         id: 2,
//         hora: hora,
//         titulo: "Zanahoria",
//         descripcion: "Verdura",
//         codigo: "producto2",
//         imagen : "##",
//         precio : 666,
//         stock: 10
//     } 
// ]

let productosDisponibles =[];


//LISTA TODOS LOS PRODUCTOS DISPONIBLES
router.get ('/', (req, res) => {
    productosDisponibles = JSON.parse( data.readFileSync( 'archivos/productos.txt','utf-8' ))  //PASA DE JSON A JS
    productosDisponibles.forEach(element => {
        element.hora = hora;
        console.log(element.hora);
    }); 
    console.log(productosDisponibles);
    res.send(productosDisponibles);
} )

//DEVUELVE EL PRODUCTO SOLICITADO SEGUN SU ID
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    //console.log(productos[0]);
    const productoSolicitado = productosDisponibles[id - 1]
    //console.log(productos[1]);
    if(isNaN( id ) || id== ''){
        console.log(id);
        //res.status(400).send({error: 'El parámetro no es un número'});
        res.send(productosDisponibles);
        return
    }
    if(id > productosDisponibles.length){
        res.status(400).send({error: 'Producto no enontrado'});
        return
    }
    
    res.send(productoSolicitado);
    
})

//AGREGA UN NUEVO PRODUCTO CON UN NUEVO ID
router.post('/', (req, res) => {
    const productoAGuardar = req.body;
    console.log("quien soy:",productoAGuardar );
    let idAgregado = parseInt( productoAGuardar.id ) //PASA DE STRING A ENTERO
    //let horaNuevo = parseInt ( productoAGuardar.hora )
    if ( data.readFileSync( 'archivos/productos.txt' ,'utf-8' )  ===  '' ) {
        console.log("ACA NO HABIA NADA");
        let NumeroPrecio = parseFloat ( productoAGuardar.precio )
        productoAGuardar.precio = NumeroPrecio ;
        productoAGuardar.id = 1;    
        productoAGuardar.hora = hora;
        console.log( 'el producto guardado es:', productoAGuardar );

        productosDisponibles.push(productoAGuardar);
        let arraySTRING= JSON.stringify( productosDisponibles )  //PASA DE JS A JSON
        data.writeFileSync(  'archivos/productos.txt', `${ arraySTRING }` )

        res.status(201).send(productosDisponibles)
     }
     else{
        console.log("ACA SI HAABIA ALGO.");
        let idAsignado; 
        let ultimoid = 0;
        let ultimoObjeto = productoAGuardar;
        let productosDisponibles = JSON.parse(  data.readFileSync('archivos/productos.txt','utf-8' )); //PASA DE JSON A JS

        productosDisponibles.forEach(element => {
            ultimoid = element.id
            console.log(element.id);
        });
        let NumeroPrecio = parseFloat ( productoAGuardar.precio )
        productoAGuardar.precio = NumeroPrecio ;
        productoAGuardar.id = ultimoid + 1 ;
        productoAGuardar.hora = hora;
        console.log("El ultimo objeto agregado es : ", productoAGuardar)
        productosDisponibles.push( productoAGuardar )
        console.log("productosDisponibles:", productosDisponibles);
        let arraySTRING= JSON.stringify( productosDisponibles )  //PASA DE JS A JSON
        data.writeFileSync(  'archivos/productos.txt', `${ arraySTRING }` ) //SOBREESCRIBO EL ARCHIVO
        res.status(201).send ( productosDisponibles )
     }
    // productoAGuardar.id = idAgregado;
    // productoAGuardar.hora = hora;
    
    // console.log( 'el producto guardado es:', productoAGuardar );

    // productosDisponibles.push(productoAGuardar);
    // let arraySTRING= JSON.stringify( productosDisponibles )  //PASA DE JS A JSON
    // data.writeFileSync(  'archivos/productos.txt', `${ arraySTRING }` )

    // res.status(201).send(productosDisponibles)
    
});

//ACTUALIZA LOS DATOS DE UN PRODUCTO SEGUN SU ID
router.put( '/:id' , ( req, res )=>{
    let { id } = req.params

    let { titulo, descripcion,codigo, imagen , precio , stock  } = req.body

    productosDisponibles[ id -1 ].titulo = titulo;
    productosDisponibles[ id -1 ].descripcion = descripcion;
    productosDisponibles[ id -1 ].codigo = codigo;
    productosDisponibles[ id -1 ].imagen = imagen;
    productosDisponibles[ id -1 ].precio = precio;
    productosDisponibles[ id -1 ].stock = stock;
    //console.log( productos );
    let arraySTRING= JSON.stringify( productosDisponibles )  //PASA DE JS A JSON
    data.writeFileSync(  'archivos/productos.txt', `${ arraySTRING }` )

    res.status(200).send("Producto Actualizado")
})

//ELIMINA PRODUCTO SEGUN SU ID
router.delete( '/:id' , (req, res) => {
    let { id } = req.params;

    productosDisponibles = JSON.parse( data.readFileSync( 'archivos/productos.txt','utf-8' ))  //PASA DE JSON A JS

    
    console.log("QUIERO BORRAR: ", productosDisponibles[ id-1 ]);
    //console.log(productosDisponibles);
    productosDisponibles.splice( id-1, 1 ) // EMPALME: DESDE DONDE BORRRA INCLUSIVE , CUANTOS BORRA
    productosDisponibles.forEach( elem => { elem.id = elem.id - 1 })
    console.log("sobrevivieron: ", productosDisponibles);
    let arraySTRING= JSON.stringify( productosDisponibles )  //PASA DE JS A JSON
    data.writeFileSync(  'archivos/productos.txt', `${ arraySTRING }` )
    
    res.status(200).send("Producto Eliminado Exitosamente");

} )

//module.exports = router
