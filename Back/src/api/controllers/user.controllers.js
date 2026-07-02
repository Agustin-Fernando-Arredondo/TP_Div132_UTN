import userModels from "../models/user.models.js";

import bcrypt from "bcrypt";

const createAdminUser = async (req, res) =>
{
    try
    {
        const {id, nombre, email, password} = req.body;

        if (!nombre || !email || !password)
        {
            return res.status(400).json({message : "Todos los campos del formulario deben estar llenos"})
        }

        const passwordHasheada = await bcrypt.hash(password, 10);

        const [user] = await userModels.insertAdminUser(nombre, email, passwordHasheada);

        return res.status(201).json({message : "Usuario creado exitosamente", userId : user.id});
    }

    catch (error)
    {
        console.log("Error al crear un usuario: ", error);

        return res.status(500).json({message : "Error interno del servidor"});
    }
}

export default
{
    createAdminUser
}