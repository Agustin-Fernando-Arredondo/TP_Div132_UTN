import express from "express";
import cors from "cors";
import session from "express-session";

import environments from "./src/api/config/environments.js";

import { join, __dirname } from "./src/api/utils/index.js";

import { authRoutes, productRoutes, viewRoutes, userRoutes, saleRoutes } from "./src/api/routes/index.js";

const {port, session_key} = environments;


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, "src/public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));

app.use("/api/products", productRoutes);
app.use("/dashboard", viewRoutes);
app.use("/login", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);

app.listen(port, () =>
{
    console.log("Servidor corriendo en el puerto ", port);
});

