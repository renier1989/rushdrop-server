import express from "express";
import { nuevoEnlace } from "../controllers/enlacesController.js";
import { check } from "express-validator";
import authCheck from "../middleware/auth.js";

const router = express.Router();

router.post(`/`, 
[
    check("nombre","Debe cargar un archivo").not().isEmpty(),
    check("nombre_original","Debe cargar un archivo").not().isEmpty(),
    
],
authCheck, nuevoEnlace);

export default router;
