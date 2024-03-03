import { Router } from "express";
import { check } from "express-validator";
<<<<<<< HEAD
import { login, register, usuarioGet } from "./usuario.controller.js";
=======
import { login, register, usuarioGet, usuariosPut } from "./usuario.controller.js";
>>>>>>> ft/publicacion
import { existeEmail } from "../helpers/db-validators.js"
import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();


router.post(
    '/register',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').not().isEmpty().custom(existeEmail),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    register
);

router.get("/get", usuarioGet);

router.get(
    '/login',
    [

    ],
    login
)

<<<<<<< HEAD
=======
router.put(
    "/put",
    [  
      check("correo", "Necesitamos su correo para actualizar").not().isEmpty(),
      check("nombre", "Los nombres son obligatorios").not().isEmpty(),
      check("password", "La contraseña nueva es obligatoria").not().isEmpty(),
      validarCampos,
    ],
    usuariosPut
  );
>>>>>>> ft/publicacion
export default router;