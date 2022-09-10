import mongooseCRUD from '../../contenedores/mongooseSchema.js'

/*---CONECCION HACIA LA BASE DE DATOS */
const URL = "mongodb://localhost:27017/proyecto-backend"

class ProductosDaoArchivo extends mongooseCRUD {

    constructor(){
        super ( '../../archivos/productos.txt' )
    }

}

export default ProductosDaoArchivo;