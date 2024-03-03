import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { comentarioDelete, comentarioGet, comentarioPut, comentariosPost } from './comentario.controller.js'
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    '/post',
    [
        validarJWT,
        check('idPublicacion', 'Necesitamos el id de la publicacion').not().isEmpty(),
        check('Comentario', 'El comentario es abligatorio').not().isEmpty(),
        validarCampos,
    ],

    comentariosPost
);

router.get(
    '/get',
    validarJWT,
    comentarioGet
);

router.put(
    "/put",
    [
        validarJWT,
        check("id", "Necesitamos el id del comentario").isMongoId(),
        check("Comentario", "Se necesita el comentario nuevo"),
        validarCampos,
    ],
    comentarioPut
);

router.delete(
    "/delete",
    [
        validarJWT,
        check("id", "Necesitamos el id del comentario").isMongoId(),
        validarCampos,
    ],
    comentarioDelete
);


export default router;