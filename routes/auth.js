import express from "express";
import {
  autenticarUsuario,
  usuarioAutenticado,
} from "../controllers/authController.js";
import { check } from "express-validator";
import authCheck from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  [
    check("email", "Ingrese un email valido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
  ],
  autenticarUsuario
);

router.get("/", authCheck, usuarioAutenticado);

export default router;
