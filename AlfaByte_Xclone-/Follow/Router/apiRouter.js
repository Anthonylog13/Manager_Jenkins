const express = require ("express");
const routerFollow = express.Router();
const { FollowValidators} = require('../../Follow/Validators/FollowValidators');
const { validationResult } = require('express-validator');


const { listFollowing, listFollowers } = require('../../Follow/Controllers/usersController');
/**
 * @swagger
 * components:
 *   schemas:
 *     Follow:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID del usuario
 *         following:
 *           type: array
 *           description: Lista de usuarios que sigue
 *           items:
 *             type: string
 *         followers:
 *           type: array
 *           description: Lista de usuarios que son seguidores
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/follow/following:
 *   get:
 *     summary: Lista los usuarios seguidos por el usuario autenticado
 *     tags: [Follow]
 *     responses:
 *       200:
 *         description: Lista de usuarios seguidos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Follow'
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

/**
 * @swagger
 * /api/follow/followers:
 *   get:
 *     summary: Lista los seguidores del usuario autenticado
 *     tags: [Follow]
 *     responses:
 *       200:
 *         description: Lista de seguidores obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Follow'
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

/**
 * @swagger
 * /api/follow/users:
 *   get:
 *     summary: Lista todos los usuarios disponibles
 *     tags: [Follow]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Follow'
 *       500:
 *         description: Error interno del servidor
 */

routerFollow.get('/following', FollowValidators, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    listFollowing(req, res, next);
  });

  routerFollow.get('/followers', FollowValidators, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    listFollowers(req, res, next);
  });






module.exports = routerFollow;