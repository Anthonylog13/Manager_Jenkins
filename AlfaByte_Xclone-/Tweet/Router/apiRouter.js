const express = require("express");
const routerPost = express.Router();
const { validatePost } = require('../Validators/postsValidators');
const { validationResult } = require('express-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Título del post
 *         content:
 *           type: string
 *           description: Contenido del post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Etiquetas asociadas al post
 *         userId:
 *           type: string
 *           description: ID del usuario que creó el post
 */

/**
 * @swagger
 * /api/posts/createPosts:
 *   post:
 *     summary: Crea un nuevo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Error en los datos proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Descripción del error
 *       500:
 *         description: Error interno del servidor
 */

routerPost.post('/createPosts', validatePost, (req, res, next) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    createPost(req, res);
});

module.exports = routerPost;
