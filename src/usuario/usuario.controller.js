import Usuario from "./usuario.model.js";
import { generarJWT } from "../helpers/generate-jwt.js"
import bcrypt from "bcryptjs"
 

export const register = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const usuario = new Usuario({ nombre, correo, password });

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    
    await usuario.save();

    res.status(200).json({
        usuario,
    });
}

export const login = async (req, res) => {
    const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Credenciales incorrectas, Correo no existe en la base de datos",
      });
    }
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario no existe en la base de datos",
      });
    }

    if (usuario) {
        const token = await generarJWT(usuario._id);
        global.tokenAcces = token;

        return res.status(200).json({
            msg:
                `------------------- BIENVENIDO -------------------
                 ------------------ Token Creado ------------------`,
            token
        });
    }


  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Comuniquese con el administrador",
    });
  }
}

export const usuarioGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, usuario] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuario
    });
}