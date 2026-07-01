const validateId = (req, res, next) =>
{
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0)
    {
        return res.status(400).json({message : "El id debe ser un número positivo mayor a 0"});
    }

    req.id = id;

    next();
}


const categoriasValidas = ["categoria1", "categoria2"] //Hardcodeamos las categorías sabiendo que solo hay 2
const validateProduct = (req, res, next) =>
{
    const {nombre, imagen, categoria, precio} = req.body;

    const errores = [];

    if (!nombre || !categoria || !precio || !imagen) 
    {
        errores.push("Faltan datos obligatorios");
    }

    if (typeof nombre !== "string" || nombre.trim().length < 2)
    {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    const precioNumero = Number(precio);

    if (typeof precioNumero !== "number" || precioNumero <= 0)
    {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (!categoriasValidas.includes(categoria))
    {
        errores.push("Categoria invalida");
    }

    if (errores.length > 0)
    {
        return res.status(400).json({message: "Datos invalidos", errores});
    }

    next();
}

const validateIsAdmin = (req, res, next) =>
{
    if (!req.session.user) {
        return res.status(401).send("No autenticado");
    }

    if (!req.session.user.esAdmin) {
        return res.status(403).send("No autorizado");
    }

    next();
}

export
{
    validateId,
    validateProduct,
    validateIsAdmin
}
