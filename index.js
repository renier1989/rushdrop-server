import express from "express";
import conectarDB from "./config/db.js";
import usuariosRoutes from "./routes/usuarios.js"
import authRoutes from "./routes/auth.js"
import enlacesRoutes from "./routes/enlaces.js"
import listaEnlacesRoutes from "./routes/lista-enlaces.js"
import archivosRoutes from "./routes/archivos.js"
import cors from 'cors'

// creamos el servidor
const app = express();
app.use(express.json());
// conectar con la BD
conectarDB();
// habilitar los CORS 
const corsOptions = {
  origin : process.env.FRONTEND_URL
}
app.use( cors(corsOptions));
// puerto de la app
const port = process.env.PORT || 4000;
// definiendo las rutas de la app

// habilitando la carpeta publica para la descarga de los archivos
app.use( express.static('uploads'))

app.use('/api/usuarios',usuariosRoutes);  
app.use('/api/auth',authRoutes);  
app.use('/api/enlaces',enlacesRoutes);  
app.use('/api/lista-enlaces',listaEnlacesRoutes);
app.use('/api/archivos',archivosRoutes);
// iniciar la aplicacion del servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor Running on port ${port}`);
});
