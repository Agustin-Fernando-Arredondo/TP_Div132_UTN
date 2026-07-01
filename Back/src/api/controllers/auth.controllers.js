import {findUserByEmailAndPassword} from "../models/user.models.js";


//Esto se va a conectar con login.ejs
const loginView = async (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Introduci tus credenciales"
    });
}

const processLogininfo = async (req, res) =>
{
    try
    {
        const {email, password} = req.body;

        if (!email || !password)
        {
            return res.render("login", {error : "Todos los campos deben estar completos"});
        }

        const usuarios = await findUserByEmailAndPassword(email, password);

        if (usuarios.length === 0) {
            return res.render("login", { error: "Credenciales inválidas" });
        }

        const usuario = usuarios[0];

        req.session.user = { id: usuario.id, nombre: usuario.nombre, email: usuario.email, isAdmin: usuario.es_admin };

        return res.redirect("/dashboard/index");
    }

    catch (error)
    {
        console.log(error);
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

export
{
    loginView, 
    processLogininfo,
    destroyLogin
}