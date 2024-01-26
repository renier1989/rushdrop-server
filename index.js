import express from "express";
import conectarDB from "./config/db.js";

// creamos el servidor
const app = express();

// conectar con la BD
conectarDB();

// puerto de la app
const port = process.env.PORT || 4000;

// iniciar la aplicacion del servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor Running on port ${port}`);
});
