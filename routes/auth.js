import express from "express";
import {
  autenticarUsuario,
  usuarioAutenticado,
} from "../controllers/authController.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [
    check("email", "Ingrese un email valido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
  ],
  autenticarUsuario
);

router.get("/", usuarioAutenticado);

export default router;
