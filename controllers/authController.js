import Usuario from "../models/Usuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";


const autenticarUsuario = async (req, res, next) => {
  // 1. revisar que no hayan errores
  // aqui se muestran los mensajes de error de Express-validator
  // con esto valido de los campos que son necesarios , estan presentes en el request
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  // 2. verificar si el usuario esta registrado
  const { email, password } = req.body;
  const user = await Usuario.findOne({ email });
  if (!user) {
    res
      .status(401)
      .json({ msg: `El usuario con el correo ${email} no Existe` });
    return next();
  }

  // 3. verificar el password y autenticar al usaurio
  if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ msg: `El password es incorrecto` });
    return next();
  } else {
    // 3.1 TODO crear un JWT para la autenticacion del usuario
    const token = jwt.sign(
      {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
      },
      process.env.SECRET_JWT,
      {
        expiresIn: "8h",
      }
    );
    res.status(200).json({ token });
  }
};

const usuarioAutenticado = async (req, res,next) => {

    const userToken = req.get('Authorization');

    if(userToken){
        // obtenemos el token del usuario autenticado y lo verificamos
        const token = userToken.split(' ')[1];

        const usuario = jwt.verify(token, process.env.SECRET_JWT);
        console.log(usuario);

    }else{
        console.log('El Token no es valido!');
    }

    return next();

};

export { autenticarUsuario, usuarioAutenticado };
