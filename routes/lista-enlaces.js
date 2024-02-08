import express from "express";
import authCheck from "../middleware/auth.js";
import { obtenerEnelacesUsuario } from "../controllers/enlacesController.js";

const router = express.Router();

router.get(
  "/",
  authCheck,
  obtenerEnelacesUsuario
);


export default router;