import dotenv from "dotenv"

dotenv.config(); //Carga las variables de .env, podremos acceder a su valor mediante process.env

export default //Exportamos la configuración de la aplicación
{
    port : process.env.PORT || 3001,
    session_key : process.env.SESSION_KEY,
    database :
    {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password : process.env.DB_PASSWORD
    }
}