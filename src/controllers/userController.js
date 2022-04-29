const {getUsers, writeUsers} = require('../data')
const {validationResult} = require('express-validator')

module.exports = {
    login: (req, res) => {
        res.render('users/login', { //login.ejs
            title: "Login"
        }) 
    },
    profile : (req, res)=>{
        res.render('users/profile', { //profile.ejs
            title: "Mi perfil"
        }) 
    },
    register: (req, res) => {
        res.render('users/register', { //register.ejs
            title: "Register"
        }) 
    },
    processRegister: (req, res) => {
        /* Verificar si hubo errores en el form */
        let errors = validationResult(req);

        if(errors.isEmpty()){

        //Registrar un usuario - Guardarlo en el JSON
       // Paso 1 - Crear un objeto User
       let ultimoId = 0;
       getUsers.forEach(user => {
           if(user.id > ultimoId){
               ultimoId = user.id
           }
       });

       let newUser = {
           id: ultimoId + 1,
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           image:req.file ? req.file.filename : "default-image.png",
        
       }
       // Paso 2 - Guardar el nuevo usuario en el array de usuarios
       getUsers.push(newUser)

       /* Paso 3- sobreescribir JSON */
       writeUsers(getUsers)

       /* Paso 4-redireccion */
       res.redirect('/usuario/login')

        }else {
            /* codigo para mostrar errores */
            res.render('users/register', {
                title: "Registro",
                errors: errors.mapped(),
                old: req.body
            })
        }

    }
}