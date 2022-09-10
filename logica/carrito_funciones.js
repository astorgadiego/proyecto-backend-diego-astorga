//const timestamp = require ('../timestamp');
import { hora } from '../timestamp.js';

export default function crearCarrito(params, objeto) {
    let productosDelCarrito = [];
                        productosDelCarrito.push(objeto)
                        console.log("FUNCION:", productosDelCarrito);
                        let NuevoCarrito = {
                            id: params,
                            timestamp: hora,
                            productos : productosDelCarrito
                        }
                        carrito.push(NuevoCarrito)
                        return " El id del carrito es: " + params
    
}
export const carrito = [];