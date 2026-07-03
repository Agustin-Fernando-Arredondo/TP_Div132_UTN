import saleModels from "../models/sale.models.js";

const createSale = async (req, res) => 
    {
    try 
    {
        const {nombre_usuario, precio_total, productos} = req.body;

        if (!nombre_usuario || !precio_total || !productos || productos.length === 0) 
        {
            return res.status(400).json({message: "Faltan datos para registrar la venta"});
        }


        const [venta] = await saleModels.insertSale(nombre_usuario, precio_total);

        await saleModels.insertSaleProducts(venta.id, productos);

        return res.status(201).json({message: "Venta registrada correctamente"});

    }

    catch (error)
    {
        console.log("Error al crear venta:", error);

        return res.status(500).json({message: "Error interno al registrar venta"});
    }
};


export default
{
    createSale
};