//Desde este archivo hacemos las sentencias a la base de datos

import connection from "../database/db.js";

const selectAllProducts = () => 
{
    const sql = "SELECT id, nombre, precio, imagen FROM productos";

    return connection.query(sql);
}

const selectProductById = (id) =>
{
    const sql = "SELECT id, nombre, precio, imagen FROM productos WHERE id = ?"

    return connection.query(sql, [id]); //query toma los valores del array para reemplazar los ? de la sentencia
}

const insertNewProduct = (nombre, imagen, categoria, precio) =>
{
    const sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [nombre, imagen, categoria, precio]);
}

const updateProduct = (id, nombre, imagen, categoria, precio) => 
{
    const sql = "UPDATE productos SET nombre = ?, imagen = ?, categoria = ?, precio = ? WHERE id = ?";

    return connection.query(sql, [nombre, imagen, categoria, precio, id]);
}

const deleteProduct = (id) => 
{
    const sql = "DELETE FROM productos where id = ?";

    return connection.query(sql, [id]);
}

export default
{
        selectAllProducts,
        selectProductById,
        insertNewProduct,
        updateProduct,
        deleteProduct
}