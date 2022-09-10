//IMPORTO LA CONFIGURACION DE FIREBASE
import { incializacion , admin } from "../modelos/configFirebase.js";

const db = admin.firestore();


class FirebaseCRUD {
    constructor( incializacion, query ) {
        this.incializacion = incializacion,
        this.query = query
    }

    async conectar () {
        try{
            await this.incializacion
            console.log("conectado a firebase");
        }
        catch( error ) {
            console.log( error );
        }
    }

    //---CREAR

    async crear () {
        try{
            const usuarioData = {
                nombre: "Juan",
                dni: "1111111",
              };
              let doc = this.query.doc();
              await doc.create(usuarioData);
          
              console.log("Usuario creado");

        }
        catch(error ) {
            console.log(error);
        }
    }


    //---READ
    async listar ( params ) {
        try{
            this.query
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                      console.log(doc.id, "=>", doc.data());
                    });
                  })
        }
        catch( error ) {
            console.log( error );
        }
    }

    async listarAll ( params ) {
        try{
            await this.incializacion
            console.log("conectado");
        }
        catch( error ) {
            console.log( error );
        }
    }

    //--UPDATE

    async actualizar ( params ) {
        try{
                this.query
                .where("dni", "==", "1111111")
                .get()
                .then((snapshot) => {
                  snapshot.forEach((doc) => {
                    doc.ref.update({ nombre: "Juanito" });
                  });
                })
                .then(() => {
                  console.log("Usuario actualizado");
                  // mostrar usuario
                  this.query
                      .where("dni", "==", "1111111")
                      .get()
                      .then((snapshot) => {
                          snapshot.forEach((doc) => {
                              console.log(doc.id, "=>", doc.data());
                          });
                      }).catch((err) => {
                          console.log("Error getting documents", err);
                      });
                })
                .catch((err) => {
                  console.log("Error getting documents", err);
                });
                
                  }
                  catch( error ) {
                      console.log( error );
                  }
    }           

    //---DELETE

    async borrar ( params ) {
        try{
                this.query
                        .where("dni", "==", "1111111")
                        .get()
                        .then((snapshot) => {
                          snapshot.forEach((doc) => {
                            doc.ref.delete();
                          });
                        });
            }
        catch( error ) {
            console.log( error );
        }
    }

    async borrarTodo ( params ) {
        try{
            await this.incializacion
            console.log("conectado");
        }
        catch( error ) {
            console.log( error );
        }
    }
}

const Diego = new FirebaseCRUD ( incializacion , db.collection("usuarios") )

Diego.actualizar()
export default FirebaseCRUD