import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Venta = sequelize.define("Venta", 
{
    id: 
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_usuario: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    fecha: 
    {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    precio_total:
    {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, 
{
    tableName: "ventas",
    timestamps: false
});

const VentaProducto = sequelize.define("SaleProduct",
{
    id_venta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
},
{
    tableName: "ventas_productos",
    timestamps: false
});

const insertSale = async (nombre_usuario, precio_total) => 
{
    const fecha = new Date();

    const row = await Venta.create(
    {
        nombre_usuario,
        precio_total,
        fecha
    });

    return [row, null];
};


const insertSaleProducts = async (id_venta, productos) => 
{
    const rows = await VentaProducto.bulkCreate(
        productos.map(producto => (
        {
            id_venta,
            id_producto: producto.id
        }))
    );

    return [rows, null];
};

export default
{
    Venta,
    VentaProducto,
    insertSale,
    insertSaleProducts
}