import express from "express";
import {
  eliminarArchivo,
  subirArchivo,
  descargarArchivo
} from "../controllers/archivosController.js";
import authCheck from "../middleware/auth.js";
const router = express.Router();

router.post("/", authCheck, subirArchivo);

router.get("/:archivos", descargarArchivo);

export default router;
