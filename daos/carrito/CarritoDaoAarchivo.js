import mongooseCRUD from '../../contenedores/mongooseSchema.js'

class CarritosDaoArchivo extends mongooseCRUD {

    constructor(){
        super ( '../../archivos/carritos.txt' )
    }

}

export default CarritosDaoArchivo;