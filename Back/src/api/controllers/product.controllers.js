import productModels from "../models/product.models.js"; //Se exportan todas las funciones gracias al export default

const getAllProducts = async (req, res) =>
{
    try 
    {
        const [rows] = await productModels.selectAllProducts();

        if (rows.length === 0)
            {
                return res.status(404).json({message : "No se encontraron productos"});
            } 
        
        res.status(200).json({
            payload : rows, 
            total : rows.length
        })
    }

    catch (error)
    {
        console.log("Error obteniendo los productos: ", error);

        return res.status(500).json({message : "Error interno al obtener los productos"});
    }
}

const getProductById = async (req, res) =>
{
    try 
    {
        const [rows] = await productModels.selectProductById(req.id)

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró un producto con el id: ${req.id}`});
        }

        res.status(200).json({payload : rows});
    }
    
    catch (error)
    {
        console.log(`Error obteniendo el producto con id ${req.id}`);

        return res.status(500).json({message: `Error interno al obtener el producto con el id ${req.id}`});
    }
}

const createProduct = async (req, res) =>
{
    try
    {
        const {nombre, imagen, categoria, precio} = req.body;

        const [rows] = await productModels.insertNewProduct(nombre, imagen, categoria, precio);
        
        res.status(201).json({message : "Producto creado con éxito", productId : rows.id});
    }

    catch (error)
    {
        console.log("Error creando el producto: ", error);

        return res.status(500).json({message : "Error interno al crear un producto"});
    }
}

const modifyProduct = async (req, res) =>
{
    try
    {
        const id = req.id;
        const { nombre, imagen, categoria, precio} = req.body;

        if(!nombre || !imagen || !categoria || !precio) //PASAR ESTO A UN MIDDLEWARE
        {
            return res.status(400).json({message : "Todos los campos del formulario deben estar llenos"});
        }

        const [rows] = await productModels.updateProduct(id, nombre, imagen, categoria, precio);

        if (rows[0] === 0) //Funciona igual a mysql
        {
            return res.status(404).json({message: `No se encontró ningun producto de id ${id} o los campos coinciden`})
        }
        
        return res.status(200).json({message : "Producto actualizado correctamente"});
        
    }
    catch (error)
    {
        console.log("Error al modificar un producto: ", error);

        return res.status(500).json({message: "Error interno al modificar un producto"});
    }
}

const removeProduct = async(req, res) =>
{
    try
    {
        const [rows] = await productModels.deleteProduct(req.id);

        if (rows === 0)
        {
            return res.status(404).json({ message: `No se encontró el producto del id ${req.id}`})
        }
        res.status(200).json({ message:`Producto desativado correctamente`});
    }

    catch(error)
    {
        console.log(`Error al eliminar el producto de id ${req.id}: `, error);

        return res.status(500).json({message : "Error interno al eliminar un producto"})
    }

}

export default
{
    getAllProducts,
    getProductById,
    createProduct,
    modifyProduct,
    removeProduct
}