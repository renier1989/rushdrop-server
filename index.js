import express from "express";
import conectarDB from "./config/db.js";
import usuariosRoutes from "./routes/usuarios.js"
import authRoutes from "./routes/auth.js"
// creamos el servidor
const app = express();
app.use(express.json());
// conectar con la BD
conectarDB();
// puerto de la app
const port = process.env.PORT || 4000;
// definiendo las rutas de la app
app.use('/api/usuarios',usuariosRoutes);  
app.use('/api/auth',authRoutes);  
// iniciar la aplicacion del servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor Running on port ${port}`);
});