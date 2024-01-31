import multer from "multer";
import shortid from "shortid";
import { URL } from "url";
import fs from "fs";

const  uploadPath = new URL('../uploads', import.meta.url).pathname;
const pathU = uploadPath.includes(':') ? uploadPath.split(':')[1] : uploadPath

const subirArchivo = (req, res, next) => {    
    const configurationMulter = {
        limits: {fileSize : req.usuario ? 1024 * 1024 * 10 : 1024 * 1024} ,
        storage :  multer.diskStorage({
            destination : (req, file, cb)=>{
                cb(null, pathU );
            },
            filename: (req, file, cb)=>{
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'),  file.originalname.length);
                // const extension = file.mimetype.split('/')[1];
                cb(null, `${shortid.generate()}${extension}`);        },
            // // esto es para poder filtrar los tipos de archivos que sera aceptado
            // // en este caso estamos diciendo que si el archivo que esta cargando es de tipo pdf
            // // esto regresara un error
            // fileFilter: (req, file, cb)=>{
            //     if(file.mimetype === 'application/pdf'){
            //         return cb(null, true)
            //     }
            // }
        }),
    }
    
    const upload = multer(configurationMulter).single('archivo');
    upload(req, res, async(error)=>{
        if(!error){
            res.json({archivo: req.file.filename})
        }else{
            res.status(400).json({msg: error.message})
            console.log(error);
            next();
        }
    })
};
const eliminarArchivo = async (req, res, next) => {
  console.log(req.archivo);

  try {
    fs.unlinkSync(`${pathU}/${req.archivo}`);
    console.log('archivo eliminado');
  } catch (error) {
    console.log(error);
  }
};

export {subirArchivo, eliminarArchivo}