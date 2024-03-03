import mongoose from 'mongoose';

const ComentarioSchema = mongoose.Schema({
    UsuarioCorreo: {
        type: String
    },
    idPublicacion: {
        type: String,
        required: true
    },
    Comentario: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

ComentarioSchema.methods.toJSON = function () {
    const { __v, _id, idPublicacion, ...comments } = this.toObject();
    comments.uid = _id;
    return comments;
}


export default mongoose.model('Comentario', ComentarioSchema);