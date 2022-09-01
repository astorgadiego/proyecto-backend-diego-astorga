import mongoose from "mongoose";

import { DBProductos } from "../../configMongoose.js"

class Contenedor{
    constructor( elemento ){
        this.elemento = elemento

    }

    listarTodo ( elemento ){
        console.log(this.elemento);
    }

    borrarPorID (elemento ){

    }

}


module.exports = Contenedor
//Diego.listarTodo()