import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conectarDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    await mongoose.connect(url, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
    });

    console.log("Conectado a DB de MongoDB");
  } catch (error) {
    console.log("Error con el servidor");
    console.log(error);
  }
};

export default conectarDB;
