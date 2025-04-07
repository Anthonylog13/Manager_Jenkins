const { check } = require('express-validator');

const FollowValidators = [
  check('email')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
    .notEmpty().withMessage('El correo electrónico es obligatorio'),
];

module.exports = {
    FollowValidators,
};