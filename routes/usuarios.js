import express from 'express';
import { nuevoUsuario } from '../controllers/usuariosController.js';



const router = express.Router();

router.post('/',
    nuevoUsuario
)

export default router