const { check } = require('express-validator');

const validateCreateUser = [
  check('phoneNumber')
  .notEmpty().withMessage('El telefono  es obligatoria')
  .isLength({ min: 10 }).withMessage('El numero debe tener al menos 10 digitos'),

  check('password')
  .notEmpty().withMessage('La contraseña es obligatoria')
  .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  
  check('email')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
  
  check('name')
    .notEmpty().withMessage('El nombre  es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
];

module.exports = {
  validateCreateUser,
};