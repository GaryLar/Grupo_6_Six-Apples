const { check } = require('express-validator');

let validateProfile = [
    check("image")
        .custom((value, {req}) => {
            let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
            if(!req.file){
                return true
            }if(!allowedExtensions.exec(req.file.filename)){
                return Promise.reject('Solo archivos con estas extensiones .jpeg/.jpg/.png/.gif')
            }else{
                return true
            }
        }),
    check("name")
        .notEmpty().withMessage('Se requiere nombre completo'),
    check("dni")
        .notEmpty().withMessage('Ingrese DNI'),
    check("phone")
        .notEmpty().withMessage('Ingrese numero telefónico'),
    check("postCode")
        .notEmpty().withMessage('Ingrese código Postal'),
    check("province")
        .notEmpty().withMessage('Elija una Provincia'),
    check("district")
        .notEmpty().withMessage('Elija una Localidad'),
    check("direction")
        .notEmpty().withMessage('Ingrese dirección'),
    check("number")
        .notEmpty().withMessage('Ingrese numero de calle')
];

module.exports = validateProfile;