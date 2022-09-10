//-------IMPORTANTE PARA PODER USAR EL REQUIRE CON EL TYPE: MODULE
import { createRequire } from 'module';
const require = createRequire ( import.meta.url )


export let admin = require("firebase-admin");

var serviceAccount = require("../clave-privada-firestore/proyecto-backend-25a16-firebase-adminsdk-wc24l-769da4a77b.json");

export const incializacion =  admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL : "https://proyecto-backend-25a16.firebaseio.com"
});



