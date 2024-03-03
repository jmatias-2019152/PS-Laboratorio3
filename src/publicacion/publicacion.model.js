import mongoose from 'mongoose';

const PublicacionSchema = mongoose.Schema({
    UsuarioCorreo: {
        type: String
    },
    titulo: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
    },
    comentarios:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
});

export default mongoose.model('Publicacion', PublicacionSchema);