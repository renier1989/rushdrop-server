import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    enlaces: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enlaces"
        }
    ]
});

const Usuario = mongoose.model('Usuario',usuarioSchema);

export default Usuario;