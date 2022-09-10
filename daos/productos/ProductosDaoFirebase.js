import FirebaseCRUD from "../../contenedores/firebaseSchema.js";
import { incializacion } from "../../modelos/configFirebase.js";


class ProductosDaoFirebase extends FirebaseCRUD { 
    constructor( ){
        super( '../../archivos/productos.txt')
    }




}

export default ProductosDaoFirebase

// const Diego = new ProductosDaoFirebase ( incializacion )

// Diego.conectar()