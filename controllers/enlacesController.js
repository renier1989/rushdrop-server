import shortid from "shortid";
import Enlace from "../models/Enlace.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const nuevoEnlace = async (req, res, next) => {
  // 1.  VERIFICAR SI HAY ERRORES
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // 2.  CREAR LA ESTRUCTURA PARA EL ENLACE
  const { nombre_original } = req.body;
  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate(); // Tienes que ser un nombre unico
  enlace.nombre_original = nombre_original;

  // SI EL USUARIO ESTA AUTENTICADO
  if (req.usuario) {
    const { password, descargas } = req.body;
    // permito que el usuario puede definir un limite de descargas
    if (descargas) {
      enlace.descargas = descargas;
    }
    // permito el que le usuario pueda establecer un password al enlace
    if (password) {
        const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }
    // registo el usuario autenticado como el autor del enlace
    enlace.autor = req.usuario.id
  }

  // ALMACENAR EN LA BD
  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

export { nuevoEnlace };
