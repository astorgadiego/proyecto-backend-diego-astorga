import ProductosDaoArchivo from "./productos/ProductosDaoArchivos.js";

import CarritosDaoArchivo from "./carrito/CarritoDaoAarchivo.js";

import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";

import CarritosDaoFirebase from "./carrito/CarritoDaoFireBase.js";

//import { variableDeEntorno } from "../server.js";

/*---CONECCION HACIA LA BASE DE DATOS MONGOOSE*/
const URL = "mongodb://localhost:27017/proyecto-backend"

//CONECCIOS HACIA LA BASE DE DATOS DE FIREBASE
import { incializacion } from '../modelos/configFirebase.js'


export const productosMongoose = new ProductosDaoArchivo ( URL );

export const carritoMongoose = new CarritosDaoArchivo ( URL );

export const productosFirebase = new ProductosDaoFirebase ( incializacion );

export const carritoFirebase = new CarritosDaoFirebase ( incializacion )


