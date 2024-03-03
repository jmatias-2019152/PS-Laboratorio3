import Publicacion from './publicacion.model.js';
import Usuario from '../usuario/usuario.model.js';

export const publicacionPost = async (req, res) => {
    const { titulo, categoria, descripcion } = req.body;
    const usuarioId = req.usuario._id;
    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado',
            });
        }
        const publicacion = new Publicacion({UsuarioCorreo: usuario.correo, titulo, categoria, descripcion,});
        await publicacion.save();
        res.status(200).json({
            publicacion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear la publicación',
        });
    }
};

/*export const publicacionGet = async (req, res) => {
    const { limite, desde } = req.query;
        const query = { estado: true };

        const [total, publicaciones] = await Promise.all([
            Publicacion.countDocuments(query),
            Publicacion.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        res.status(200).json({
            total,
            publicaciones
        });
};*/

export const publicacionGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    try {
        const [total, publicaciones] = await Promise.all([
            Publicacion.countDocuments(query),
            Publicacion.find(query)
                .populate({
                    path: 'comentarios',
                    match: { estado: { $ne: false } }  
                })
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        const publicacionesFiltradas = publicaciones.map(pub => {
            const comentariosFiltrados = pub.comentarios.filter(com => com.estado !== false);
            return { ...pub.toObject(), comentarios: comentariosFiltrados };
        });

        res.status(200).json({
            total,
            publicaciones: publicacionesFiltradas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener las publicaciones',
            error: error.message
        });
    }
};


export const publicacionPut = async (req, res) => {
    const { id, titulo, categoria, descripcion } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere proporcionar un ID válido en el cuerpo de la solicitud',
            });
        };
        const publicacion = await Publicacion.findByIdAndUpdate(id,{ titulo, categoria, descripcion },{ new: true });

        if (!publicacion) {
            return res.status(404).json({
                msg: 'Publicación no encontrada',
            });
        };

        if (req.usuario.correo !== publicacion.UsuarioCorreo) {
            return res.status(403).json({
                msg: 'No tienes permisos para editar esta publicación',
            });
        };

        res.status(200).json({
            msg: 'Publicación actualizada',
            publicacion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la publicación',
        });
    }
};

export const publicacionDelete = async (req, res) => {
    const { id } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                msg: 'Se requiere proporcionar un ID válido en el cuerpo de la solicitud',
            });
        }
        const publicacion = await Publicacion.findByIdAndUpdate(id,{ estado: false },{ new: true });

        if (!publicacion) {
            return res.status(404).json({
                msg: 'Publicación no encontrada',
            });
        }   

        if (req.usuario.correo !== publicacion.UsuarioCorreo) {
            return res.status(403).json({
                msg: 'No tienes permisos para eliminar esta publicación',
            });
        };

        res.status(200).json({
            msg: 'Publicación eliminada',
            publicacion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar la publicación',
        });
    }
};