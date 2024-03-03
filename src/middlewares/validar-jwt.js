import jwt from 'jsonwebtoken';

import Usuario from '../usuario/usuario.model.js';


export const validarJWT = async (req, res, next) => {
    const token = global.tokenAcces;
    if (!token) {
        return res.status(401).json({
            msg: "Iniciar sesion para poder continuar con esta funcion"
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe en la base de datos'
            });
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado:false'
            });
        }
        req.usuario = usuario;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
}