import express from "express";
import {
  nuevoEnlace,
  obtenerEnlace,
  todosLosEnlaces,
  tienePassword,
  verificarPassword
} from "../controllers/enlacesController.js";
import { check } from "express-validator";
import authCheck from "../middleware/auth.js";

const router = express.Router();

router.post(
  `/`,
  [
    check("nombre", "Debe cargar un archivo").not().isEmpty(),
    check("nombre_original", "Debe cargar un archivo").not().isEmpty(),
  ],
  authCheck,
  nuevoEnlace
);

router.get('/',
  todosLosEnlaces
)

// aqui lo que se hace es poner dos funciones, con el objetivo que que cuando se analice el enlace
// si es que ya no posee mas descargas pase obtenerEnlace a eliminarAchivo, pasando al siguiente middleware
// desde el controlador con next()
router.get("/:url", 
tienePassword,
obtenerEnlace );

router.post("/:url",
verificarPassword,
obtenerEnlace,
)

export default router;
