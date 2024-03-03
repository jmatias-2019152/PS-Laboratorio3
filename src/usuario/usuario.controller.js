import Usuario from "./usuario.model.js";
import { generarJWT } from "../helpers/generate-jwt.js"
import bcrypt from "bcryptjs"
<<<<<<< HEAD
 

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
=======


export const register = async (req, res) => {
  const { nombre, correo, password } = req.body;
  const usuario = new Usuario({ nombre, correo, password });

  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.status(200).json({
    usuario,
  });
};

export const login = async (req, res) => {
  const { correo, password } = req.body;
>>>>>>> ft/publicacion

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

<<<<<<< HEAD
    if (usuario) {
        const token = await generarJWT(usuario._id);
        global.tokenAcces = token;

        return res.status(200).json({
            msg:
                `------------------- BIENVENIDO -------------------
                 ------------------ Token Creado ------------------`,
            token
        });
=======
    const contraseñaValida = bcrypt.compareSync(password, usuario.password);

    if (!contraseñaValida) {
      return res.status(400).json({
        msg: "Credenciales incorrectas, contraseña no válida",
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
>>>>>>> ft/publicacion
    }


  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Comuniquese con el administrador",
    });
  }
<<<<<<< HEAD
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
=======
};

export const usuarioGet = async (req = request, res = response) => {
  const { limite, desde } = req.query;
  const query = { estado: true };

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
};

export const usuariosPut = async (req, res) => {
  const { correo, nombre, passwordAnterior, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario || usuario.estado === false) {
      return res.status(404).json({ msg: "Usuario no encontrado o no activo" });
    }

    if (passwordAnterior && password) {
      if (!bcrypt.compareSync(passwordAnterior, usuario.password)) {
        return res.status(400).json({
          msg: 'La contraseña anterior no es válida',
        });
      }
      
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
    }

    usuario.nombre = nombre;

    const usuarioActualizado = await usuario.save();

    res.status(200).json({
      msg: 'Usuario actualizado',
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar el usuario',
      error: error.message,
    });
  }
};
>>>>>>> ft/publicacion
