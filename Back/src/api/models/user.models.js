import connection from "../database/db.js";

const findUserByEmailAndPassword = (email, password) =>
{
    const sql = "SELECT * FROM productos WHERE email = ? AND password = ?";

    return connection.query(sql, [email, password]);
}

export
{
    findUserByEmailAndPassword
}