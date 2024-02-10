import express from "express";
import authCheck from "../middleware/auth.js";
import {
  obtenerEnelacesUsuario,
  eliminarEnlaceUsuario,
} from "../controllers/enlacesController.js";

const router = express.Router();

router.get("/", authCheck, obtenerEnelacesUsuario);

router.post("/eliminar", authCheck, eliminarEnlaceUsuario);

export default router;
