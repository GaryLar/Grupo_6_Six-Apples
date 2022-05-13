const { check, body } = require('express-validator');

let validateEditProduct = [
    check('name')
        .notEmpty().withMessage('Ingresa un nombre o manten el anterior').bail()
        .isAlphanumeric().withMessage('Ingrese un nombre válido'),
    check('type')
        .notEmpty().withMessage('Debes ingresar el tipo de producto'),
    check('categoryName')
        .notEmpty().withMessage('Selecciona una categoría'),
    check('price')
        .notEmpty().withMessage('Ingresa precio del producto').bail()
        .isNumeric().withMessage('Ingrese sólo números'),
    check('origin')
        .notEmpty().withMessage('Debes ingresar el origen del producto')
]

module.exports = validateEditProduct;