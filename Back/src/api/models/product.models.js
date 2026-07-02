//Desde este archivo Sequelize se conecta con la base de datos

import { DataTypes } from "sequelize";

import sequelize from "../database/db.js";


const Producto = sequelize.define("Product",
    {
        id : 
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombre :
        {
            type: DataTypes.STRING,
            allowNull: false
        },

        imagen :
        {
            type: DataTypes.STRING,
            allowNull: false
        },

        categoria :
        {
            type: DataTypes.ENUM("categoria1", "categoria2"),
            allowNull: false
        },

        precio :
        {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        activo :
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "productos", //Configuramos para que el nombre de la tabla sea igual a la de la base de datos
        timestamps: false
    }
);




const selectAllProducts = async () =>
{
    const rows = await Producto.findAll(
    {
        attributes : ["id", "nombre", "precio", "imagen"]
    }
    );

    return [rows, null]; //Mismo formato que toman los controllers
};

const selectProductById = async (id) => 
{
    const rows = await Producto.findOne(
    {
        where : { id },
        attributes : ["id", "nombre", "precio", "imagen"]
    }
    );

    return [rows, null];
};

const insertNewProduct = async (nombre, imagen, categoria, precio) =>
{
    const rows = await Producto.create(
    {
        nombre,
        imagen,
        categoria,
        precio
    }
    );

    return [rows, null];
};

const updateProduct = async (id, nombre, imagen, categoria, precio) => 
{
    const rows = await Producto.update(
        {
            nombre,
            imagen,
            categoria,
            precio
        },
        {
            where: { id }
        }
    );

    return [rows, null];
};

const deleteProduct = async (id) => 
{
    const rows = await Producto.destroy(
    {
        where: { id }
    }
    );

    return [rows, null];
};

export default
{
        Producto,
        selectAllProducts,
        selectProductById,
        insertNewProduct,
        updateProduct,
        deleteProduct
}