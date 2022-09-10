import mongoose from "mongoose";

import { DBProductos } from "../modelos/configMongoose.js";

/*---CONECCION HACIA LA BASE DE DATOS */
const URL = "mongodb://localhost:27017/proyecto-backend"


class mongooseCRUD  {
    constructor ( URL ) {
        this.url = URL;
    }

    async conectar () {
        /*---CONECCION HACIA LA BASE DE DATOS */
        const coneccion = await mongoose.connect ( this.url, { //INDICAMOS A QUE BASE DE DATOS QUIERO QUE SE CONECTE
            useNewUrlParser: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
         } )
        console.log( { coneccion }); 
        console.log("Conectado a MongoDB");
    }

    //--CREATE
    async Guardar ( params ) {
        try{
            //----CREATE
            console.log("CREATE")
            const productoData = {
                                    id: 1, 
                                    titulo: "Hernan",
                                    descripcion: "San Martin",
                                    codigo: 100,
                                    imagen:"##",
                                    precio:66,
                                    stock: 50,
                                };
            const productoNuevo = new DBProductos ( productoData ) //CREO UNA INSTANCIA DE PRODUCTO
                                        //QUE USA LOS DATOS DE PRODUCTODATA
                    
            await productoNuevo.save(); //SI NO DA NINGUN ERROR ACA GUARDO LOS DATOS EN LA DB
            console.log(productoNuevo);
            console.log("Usuario creado");
        }
        catch(error){
            console.log(error);
        }

        
    }

    //--READ
    async listar () {
        try{

        }
        catch(error){
            console.log(error);
        }
    }

    async listarAll () {
        try{

            //----READ
                console.log("READ")
                const productos = await DBProductos.find();
                console.log({ productos });
        }
        catch(error){
            console.log(error);
        }
        
    }

    //--UPDATE
    async Actualizar ( params ) {
        try{

        }
        catch(error){
            console.log(error);
        }
    }


    //--DELETE
    async Borrar ( params ) {

        try{
            //---DELETE
                await DBProductos.deleteMany()
                console.log("Productos Borrados");
        }
        catch(error){
            console.log(error);
        }
        
    }

    async BorrarTodo () {

        try{
                //---DELETE
                await DBProductos.deleteMany({})
                console.log("Productos Borrados");
        }
        catch(error){
            console.log(error);
        }
        
    }
}

//IMPORTANTE: TENER EL MONGOD --DB PATH . (EN LA CARPETA 9NODESAFIO/MIBASEMONGO/) Y EL MONGOSH CONECTADO

// const Diego = new mongooseCRUD ( URL )

// Diego.conectar();

export default mongooseCRUD;