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
  const { nombre_original, nombre } = req.body;
  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = nombre; // Tienes que ser un nombre unico
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
    enlace.autor = req.usuario.id;
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

const tienePassword = async (req, res, next) => {
  // comprobamos que el enlace existe
  const { url } = req.params;
  const enlace = await Enlace.findOne({ url });
  if (!enlace) {
    return res.status(404).json({ msg: "Enlace no esta Disponible." });
  }

  if (enlace.password) {
    return res.json({ archivo: enlace.nombre, password: true, enlace: enlace.url });
  }
  next();

};

const obtenerEnlace = async (req, res, next) => {
  // comprobamos que el enlace existe
  const { url } = req.params;
  const enlace = await Enlace.findOne({ url });
  

  if (!enlace) {
    console.log("aqui entra en el error...................");
    return res.status(404).json({ msg: "Enlace no esta Disponible." });
  } else {
    // si el enlace si existe, retornamos el nombre del enlace
      res.status(200).json({ archivo: enlace.nombre, password: false });
    return next();
  }
};

// obtener el listado de todos los enlaces
const todosLosEnlaces = async (req, res) => {
  try {
    const enlaces = await Enlace.find({}).select("url nombre -_id");
    res.json({ enlaces });
  } catch (error) {
    console.log(error);
  }
};

const verificarPassword = async (req, res, next) => {
  const { url } = req.params;
  const { password } = req.body;

  // consulto por el enlace
  const enlace = await Enlace.findOne({ url });

  // luego verifico el si el password es correcto
  if (bcrypt.compareSync(password, enlace.password)) {
    next();
  } else {
    res.status(401).json({ msg: "Password incorrecto.!" });
  }
};

// funcion para obtener los enlaces de un usuario autenticado
const obtenerEnelacesUsuario = async (req,res,next) =>{
  console.log(req.usuario);
  
  if(!req.usuario){
    return res.status(404).json({ msg: "Inicie Sesion para ver sus enlaces." });
  }

  const enlaces = await Enlace.find({
    autor : req.usuario.id
  }).select(" -__v -autor")
  res.status(200).json(enlaces);
}


export {
  nuevoEnlace,
  obtenerEnlace,
  todosLosEnlaces,
  tienePassword,
  verificarPassword,
  obtenerEnelacesUsuario,
};
