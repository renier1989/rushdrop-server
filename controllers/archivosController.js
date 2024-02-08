import multer from "multer";
import shortid from "shortid";
import { URL } from "url";
import fs from "fs";
import Enlace from '../models/Enlace.js'

const uploadPath = new URL("../uploads", import.meta.url).pathname;
const pathU = uploadPath.includes(":") ? uploadPath.split(":")[1] : uploadPath;

const subirArchivo = (req, res, next) => {
  const configurationMulter = {
    limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, pathU);
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        // const extension = file.mimetype.split('/')[1];
        cb(null, `${shortid.generate()}${extension}`);
      },
      // // esto es para poder filtrar los tipos de archivos que sera aceptado
      // // en este caso estamos diciendo que si el archivo que esta cargando es de tipo pdf
      // // esto regresara un error
      // fileFilter: (req, file, cb)=>{
      //     if(file.mimetype === 'application/pdf'){
      //         return cb(null, true)
      //     }
      // }
    }),
  };

  const upload = multer(configurationMulter).single("archivo");
  upload(req, res, async (error) => {
    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      res.status(400).json({ msg: error.message });
      console.log(error);
      next();
    }
  });
};

const descargarArchivo = async (req, res, next) => {
  const {archivos} = req.params;
  // buscamos el enlace que contiene el archivo que se quiere descargar
  const enlace = await Enlace.findOne({nombre: archivos })
  if(!enlace){
    return res.status(404).json({ msg: 'Ya no esta disponible el Archivo ...' });
  }

  const archivoDescarga = `${pathU}/${archivos}`;
  res.download(archivoDescarga);

  

  // aqui se debe eliminar el archivo y el registro en la BD
    // comprobamos la cantidad de descargas, si este es igual a 1 entonces se borra del server
    const { descargas, nombre } = enlace;

    if (descargas === 1) {
      // asigno en el request el nombre del archivo que se va a eliminar
      req.archivo = nombre;
  
      // luego hay que eliminar la entrada del enlace des la BD
      await Enlace.deleteOne({_id: enlace.id});
  
      // aqui paso al siguiente middleware declarado en las rutas para la eliminacion del archivo
      next();
    }
    // si las descargas con mayores 1 , le iremos restando en uno
    else {
      enlace.descargas--;
      await enlace.save();
    }


};

const eliminarArchivo = async (req, res, next) => {

  try {
    fs.unlinkSync(`${pathU}/${req.archivo}`);
  } catch (error) {
    console.log(error);
  }
};


export { subirArchivo, eliminarArchivo, descargarArchivo };
