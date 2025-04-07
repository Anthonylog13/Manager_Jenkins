const { check } = require('express-validator');

const validateLogin = [
  check('email')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
    .notEmpty().withMessage('El correo electrónico es obligatorio'),
  
  check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

module.exports = {
    validateLogin,
};
