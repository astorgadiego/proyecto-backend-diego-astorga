const timestamp = require ('../timestamp');
// function crearCarrito(params, objeto) {

//     let NuevoCarrito = {
//         id: params,
//         timestamp: timestamp,
//         productos : objeto
//     }
//     carrito.push(NuevoCarrito)
//     return " El id del carrito es: " + params  
// }


const carrito = [];

module.exports = {
    crearCarrito : ( params, objeto ) => {
                        let productosDelCarrito = [];
                        productosDelCarrito.push(objeto)
                        console.log("FUNCION:", productosDelCarrito);
                        let NuevoCarrito = {
                            id: params,
                            timestamp: timestamp,
                            productos : productosDelCarrito
                        }
                        carrito.push(NuevoCarrito)
                        return " El id del carrito es: " + params 
                    },
    carrito : carrito
}
