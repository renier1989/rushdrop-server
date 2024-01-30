import mongoose, { now } from "mongoose";

const Schema = mongoose.Schema;

const enlaceSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  nombre_original: {
    type: String,
    required: true,
  },
  descargas: {
    type: Number,
    default: 1  // POR DEFECTO LOS USUARIO QUE NO ESTEN AUTENTICADOS SOLO PODRAS HACER UNA DOLA DESCARGA
  },
//   ESTO ES UN ID DE REFERENCIA A LA TABLA DE LOS USUARIOS
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

const Enlace = mongoose.model("Enlaces", enlaceSchema);

export default Enlace;
