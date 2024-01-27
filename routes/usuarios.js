import express from 'express';
import { nuevoUsuario } from '../controllers/usuariosController.js';
import { check } from 'express-validator';

const router = express.Router();

router.post('/',
    // validaciones de express-validator
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Ingresa un Email valido').isEmail(),
        // check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6}),
    ],
    nuevoUsuario
)

export default router