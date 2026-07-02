import {Sequelize} from "sequelize";

import environments from "../config/environments.js";

const {database} = environments;

//Pool de Conexiones
const sequelize = new Sequelize(
    database.name,
    database.user,
    database.password,
    {
        host : database.host,
        dialect : "mysql",
    }
    );

export default sequelize;