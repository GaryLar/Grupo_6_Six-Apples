const { check, body } = require('express-validator');

let validateProduct = [
    check('name')
        .notEmpty().withMessage('Debes ingresar el nombre del producto').bail()
        .isLength({ min: 5 }).withMessage('Ingrese un nombre válido'),
    check('type')
        .notEmpty().withMessage('Debes ingresar el tipo de producto'),
    check('categoryId')
        .notEmpty().withMessage('Selecciona una categoría'),
    check('price')
        .notEmpty().withMessage('Ingresa precio del producto').bail()
        .isNumeric().withMessage('Ingrese sólo números'),
    check('origin')
        .notEmpty().withMessage('Debes ingresar el origen del producto')
]

module.exports = validateProduct;