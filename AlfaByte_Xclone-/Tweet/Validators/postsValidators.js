const { check } = require('express-validator');


const validatePost = [
  check('id_User')
  .notEmpty().withMessage('El posts debe de traer el id_usuario'),

  check('title')
    .notEmpty().withMessage('El título es obligatorio') 
    .isLength({ min: 3 }).withMessage('El título debe tener al menos 5 caracteres'),

  check('body')
    .notEmpty().withMessage('El cuerpo del post es obligatorio') 
    .isLength({ min: 10,max: 255 }).withMessage('El cuerpo del post debe tener al menos 10 caracteres y maximo 255'),
];

module.exports = {
    validatePost,
};