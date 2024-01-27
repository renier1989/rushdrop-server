import { validationResult } from "express-validator";
import Usuario from "../models/Usuarios.js";
import bcrypt from "bcrypt";

const nuevoUsuario = async (req, res) => {

  // aqui se muestran los mensajes de error de Express-validator
  // con esto valido de los campos que son necesarios , estan presentes en el request
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()});
  }

  // validando el email del usuario
  const { email, password } = req.body;
  let usuario = await Usuario.findOne({ email });

  if (usuario) {
    return res
      .status(400)
      .json({ msg: `El Correo ${email} , ya esta registrado.` });
  }

  // registro el usuario en la BD
  usuario = new Usuario(req.body);
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  try {
    await usuario.save();
    res.json({ msg: `El usuario ${usuario.nombre}, se registro con exito` });

  } catch (error) {
    console.log(error);
  }
};

export { nuevoUsuario };
