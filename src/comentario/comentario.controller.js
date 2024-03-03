import Publicacion from '../publicacion/publicacion.model.js';
import Usuario from '../usuario/usuario.model.js';
import ComentarioS from './comentario.model.js';


export const comentariosPost = async (req, res) => {
    try {
        const { idPublicacion, Comentario } = req.body;
        const usuarioId = req.usuario._id;
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no encontrado en la base de datos',
            });
        }
        const comentario = new ComentarioS({
            idPublicacion,
            Comentario,
            Usuario: usuarioId,
            UsuarioCorreo: usuario.correo,
        });
        const publicacionExistente = await Publicacion.findById(idPublicacion);
        if (!publicacionExistente) {
            return res.status(400).json({
                msg: 'La publicacion no existe en la base de datos',
            });
        }
        await comentario.save();

        publicacionExistente.comentarios.push(comentario._id);
        await publicacionExistente.save();

        res.status(200).json({
            msg: 'Comentario subido exitosamente',
            comentario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear la publicación',
        });
    }
};


export const comentarioGet = async (req, res) => {
    const { limite, desde } = req.query;
        const query = { estado: true };

        const [total, comentario] = await Promise.all([
            ComentarioS.countDocuments(query),
            ComentarioS.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        res.status(200).json({
            total,
            comentario
        });
};

export const comentarioPut = async (req, res) => {
    const { id, Comentario } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere proporcionar un ID válido en el cuerpo de la solicitud',
            });
        };
            const comentario = await ComentarioS.findByIdAndUpdate(id,{ Comentario },{ new: true });

        if (!comentario) {
            return res.status(404).json({
                msg: 'Publicación no encontrada',
            });
        };

        if (req.usuario.correo !== comentario.UsuarioCorreo) {
            return res.status(403).json({
                msg: 'No tienes permisos para editar esta publicación',
            });
        };

        res.status(200).json({
            msg: 'Comentario actualizado',
            comentario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la publicación',
        });
    }
};

export const comentarioDelete = async (req, res) => {
    const { id } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere proporcionar un ID válido en el cuerpo de la solicitud',
            });
        }
        const comentario = await ComentarioS.findByIdAndUpdate(id,{ estado: false },{ new: true });

        if (!comentario) {
            return res.status(404).json({
                msg: 'Comentario no encontrado',
            });
        }   

        if (req.usuario.correo !== comentario.UsuarioCorreo) {
            return res.status(403).json({
                msg: 'No tienes permisos para eliminar esta publicación',
            });
        };

        res.status(200).json({
            msg: 'Publicación eliminada',
            comentario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar la publicación',
        });
    }
};