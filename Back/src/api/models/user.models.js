//Desde este archivo Sequelize se conecta con la base de datos

import { DataTypes } from "sequelize";

import sequelize from "../database/db.js";


const Usuario = sequelize.define("User",
    {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombre:
        {
            type: DataTypes.STRING,
            allowNull: false
        },

        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique : true
        },

        password:
        {
            type: DataTypes.STRING,
            allowNull: false
        },

        es_admin:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: "usuarios", //Configuramos para que el nombre de la tabla sea igual a la de la base de datos
        timestamps: false
    }
);



const insertAdminUser = async (nombre, email, password) =>
{
    const user = await Usuario.create(
    {
        nombre,
        email,
        password
    }
    );

    return [user, null];
};


const findUserByEmail = async (email) => 
{
    const user = await Usuario.findOne(
    {
        where: { email }
    }
    );

    return [user, null];
};

export default
{
    Usuario,
    insertAdminUser,
    findUserByEmail
}