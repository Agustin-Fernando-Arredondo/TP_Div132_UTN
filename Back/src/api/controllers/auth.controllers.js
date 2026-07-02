import userModels from "../models/user.models.js";

import bcrypt from "bcrypt";


//Esto se va a conectar con login.ejs
const loginView = async (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Introduci tus credenciales"
    });
}

//Comparacion bcrypt
const processLogininfo = async (req, res) =>
{
    try
    {
        const {email, password} = req.body;

        if (!email || !password)
        {
            return res.render("login", 
            {   title : "Login", 
                about : "Introducí tus credenciales", 
                error : "Todos los campos deben estar completos"
            });
        }

        const [usuario] = await userModels.findUserByEmail(email);

        if (!usuario) {
            return res.render("login", 
            {   title : "Login", 
                about : "Introducí tus credenciales",
                error: "El usuario no existe"
            });
        }

        const coincide = await bcrypt.compare(password, usuario.password);

        if (!coincide)
        {
            return res.render("login",
                {
                    title: "Login",
                    about: "Introducí tus credenciales",
                    error: "La contraseña es incorrecta"
                });
        }

        req.session.user = { id: usuario.id, nombre: usuario.nombre, email: usuario.email, esAdmin: usuario.es_admin };

        return res.redirect("/dashboard/index");
    }

    catch (error)
    {
        console.log("Error al loguearse: ", error);

        return res.status(500).send("Error interno del servidor");
    }
    
} 

const destroyLogin = (req, res) =>
{
    req.session.destroy((error) => 
    {
        if (error) {
            console.log("Error al destruir la sesion: ", error);

            return res.status(500).send("Error al cerrar la sesión");
        }

        return res.redirect("/login");
    }
    );
};

export default
{
    loginView, 
    processLogininfo,
    destroyLogin
}