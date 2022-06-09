const { check, body } = require('express-validator');

let validateProfile = [
    check("name")
        .notEmpty().withMessage('Se require nombre completo'),
    check("dni")
        .notEmpty().withMessage('Se require nombre completo'),
    check("phone")
        .notEmpty().withMessage('Se require nombre completo'),
    check("postCode")
        .notEmpty().withMessage('Se require nombre completo'),
    check("province")
        .notEmpty().withMessage('Se require nombre completo'),
    check("district")
        .notEmpty().withMessage('Se require nombre completo'),
    check("direction")
        .notEmpty().withMessage('Se require nombre completo'),
    check("number")
        .notEmpty().withMessage('Se require nombre completo')
];

module.exports = validateProfile;