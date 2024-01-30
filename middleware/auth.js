import jwt from "jsonwebtoken";

const authCheck = (req, res, next) => {
  const userToken = req.get("Authorization");

  if (userToken) {
    // obtenemos el token del usuario autenticado y lo verificamos
    const token = userToken.split(" ")[1];
    try {
      const usuario = jwt.verify(token, process.env.SECRET_JWT);
      req.usuario = usuario
    } catch (error) {
      console.log(error);
      console.log("El Token no es valido!");
    }
  }

  return next();
};


export default authCheck;