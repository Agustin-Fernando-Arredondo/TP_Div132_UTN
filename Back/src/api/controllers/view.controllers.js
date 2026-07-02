//Puente entre los archivos ejs y la base de datos

import productModels from "../models/product.models.js";

const indexView = async (req, res) =>
{
    try
    {
        const [productos] = await productModels.selectAllProducts()
    
        res.render("index", 
        {
            title : "Dashboard",
            about : "Productos del negocio",
            arrayProductos : productos
        }
        );
    }

    catch (error)
    {
        console.log("Error al obtener los productos", error);

        return res.status(500).json({message : "Error interno en el servidor"});
    }

}

const getProductView = (req, res) =>
{
    res.render("get", 
        {
            title : "Obtener producto",
            about : "Consultar producto por id"
        }
    );
}

const createProductView = (req, res) =>
{
    res.render("post",
        {
            title : "Crear",
            about : "Crear producto"
        }
    );
}

const updateProductView = (req, res) =>
{
    res.render("put",
        {
            title : "Actualizar",
            about: "Consultar producto por id"
        }
    );
}

const deleteProductView = (req, res) =>
{
    res.render("delete",
        {
            title : "Eliminar",
            about: "Consultar producto por id"
        }
    )
}

export default
{
    indexView,
    getProductView,
    createProductView,
    updateProductView,
    deleteProductView
}