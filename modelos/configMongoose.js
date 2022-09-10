import mongoose from "mongoose";

const productosCollection = "productos";

const productosSchema = new mongoose.Schema ({   //ESQUEMA
    id : { type: Number , required : true, maxLength: 100 },
    titulo : { type: String, required : true, maxLength: 100 },
    descripcion: { type: String, required : true, maxLength: [200, "EL APELLIDO ES MUY LARGO"] },
    codigo : { type: Number , required : true, maxLength: 100 },
    imagen: { type: String, required : true, maxLength: 100 },
    precio : { type: Number, required : true, maxLength: 100 },
    stock : { type: Number, required : true, maxLength: 100 },
})

export const DBProductos = mongoose.model ( productosCollection, productosSchema ) //MODELO QUE HACE USO DEL ESQUEMA