import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('Usuario', UserSchema);