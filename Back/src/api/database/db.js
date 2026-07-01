import mysql2 from "mysql2/promise" // Modo promesa para async/await

import environments from "../config/environments.js"

const {database} = environments;

//Pool de Conexiones
const connection = mysql2.createPool(
    {
        host : database.host,
        database : database.name,
        user : database.user,
        password : database.password
    }
);

export default connection;