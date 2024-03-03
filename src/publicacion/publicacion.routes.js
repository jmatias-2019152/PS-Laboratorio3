import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { publicacionPost, publicacionGet, publicacionPut, publicacionDelete } from './publicacion.controller.js'
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    '/post',
    [
        validarJWT,
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('categoria', 'La categoria es abligatoria').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        validarCampos,
    ],

    publicacionPost
);

router.get(
    '/get',
    validarJWT,
    publicacionGet
);

router.put(
    "/put",
    [
        validarJWT,
        check("id", "Necesitamos el id de la publicacion").isMongoId(),
        validarCampos,
    ],
    publicacionPut
);

router.delete(
    "/delete",
    [
        validarJWT,
        check("id", "Necesitamos el id de la publicacion").isMongoId(),
        validarCampos,
    ],
    publicacionDelete
);

export default router;