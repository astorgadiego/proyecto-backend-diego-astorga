const { timeStamp } = require('console');
const express = require ( 'express' );
const timestamp = require ('./timestamp');
const data = require ('fs');

const { Router } = express;

const router = Router();

// const productosDisponibles =[
//     {
//         id: 1,
//         timeStamp: Date.now(),
//         titulo: "Brocoli",
//         descripcion: "Verdura",
//         codigo: "producto1",
//         imagen : "##",
//         precio : 45,
//         stock: 10
//     },
//     {
//         id: 2,
//         timeStamp: timestamp,
//         titulo: "Zanahoria",
//         descripcion: "Verdura",
//         codigo: "producto2",
//         imagen : "##",
//         precio : 666,
//         stock: 10
//     } 
// ]

let productosDisponibles;

router.get ('/', (req, res) => {
    productosDisponibles = JSON.parse( data.readFileSync( 'archivos/productos.txt','utf-8' ))  //PASA DE JSON A JS
    productosDisponibles.forEach(element => {
        element.timeStamp = timestamp;
        console.log(element.timeStamp);
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
    
    let idAgregado = parseInt( productoAGuardar.id )
    //let timeStampNuevo = parseInt ( productoAGuardar.timeStamp )

    productoAGuardar.id = idAgregado;
    productoAGuardar.timeStamp = timestamp;
    
    console.log( productoAGuardar );

    productosDisponibles.push(productoAGuardar);
    let arraySTRING= JSON.stringify( productosDisponibles )  //PASA DE JS A JSON
    data.writeFileSync(  'archivos/productos.txt', `${ arraySTRING }` )

    res.status(201).send(productosDisponibles)
    
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
    console.log(productosDisponibles);
    productosDisponibles.splice( id-1, id-1 )
    productosDisponibles.forEach( elem => { elem.id = elem.id - 1 })
    console.log("borrando", productosDisponibles);
    let arraySTRING= JSON.stringify( productosDisponibles )  //PASA DE JS A JSON
    data.writeFileSync(  'archivos/productos.txt', `${ arraySTRING }` )
    
    res.status(200).send("Producto Eliminado Exitosamente");

} )

module.exports = router