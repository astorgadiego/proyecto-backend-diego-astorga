import FirebaseCRUD from "../../contenedores/firebaseSchema.js";

import { incializacion } from "../../modelos/configFirebase.js";


class CarritosDaoFirebase extends FirebaseCRUD { 
    constructor( ){
        super( '../../archivos/carritos.txt')
    }
    

}

export default CarritosDaoFirebase
// const Diego= new CarritosDaoFirebase (incializacion )

// Diego.conectar()