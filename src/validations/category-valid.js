const { check} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty()
        .withMessage('campo requerido').bail()
        .isLength({ min: 6 }).withMessage('Ingrese una categoria valida'),
]
