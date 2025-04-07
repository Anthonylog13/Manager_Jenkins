const express = require('express');
const routerAuth = express.Router();


const { createUser } = require('../Controllers/registerController');
const { LoginUser } = require('../Controllers/loginController');
const { validateCreateUser} = require('../Validators/registerValidators');
const { validateLogin} = require('../Validators/loginValidators');
const { validationResult } = require('express-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phoneNumber
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         phoneNumber:
 *           type: string
 *           description: Número de teléfono del usuario
 *         following:
 *           type: array
 *           description: Lista de usuarios que sigue (opcional)
 *           items:
 *             type: string
 *         followers:
 *           type: array
 *           description: Lista de seguidores del usuario (opcional)
 *           items:
 *             type: string
 *       example:
 *         name: "John Doe"
 *         email: "johndoe@example.com"
 *         password: "password123"
 *         phoneNumber: "1234567890"
 *         following: []
 *         followers: []
 * 
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         email: "johndoe@example.com"
 *         password: "password123"
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Estado de la operación
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del usuario registrado
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del usuario registrado
 *                 token:
 *                   type: string
 *                   description: Token JWT generado
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
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión en la aplicación
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Estado de la operación
 *                 token:
 *                   type: string
 *                   description: Token JWT generado
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
routerAuth.post('/register', validateCreateUser, (req, res, next) => {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  createUser(req, res, next);
});

routerAuth.post('/login', validateLogin, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    LoginUser(req, res, next);
});

module.exports = routerAuth;



