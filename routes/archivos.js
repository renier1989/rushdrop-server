import express from "express";
import {
  eliminarArchivo,
  subirArchivo,
} from "../controllers/archivosController.js";
import authCheck from "../middleware/auth.js";
const router = express.Router();

router.post("/", authCheck, subirArchivo);

export default router;
