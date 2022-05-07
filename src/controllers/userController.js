const {getUsers, writeUsers} = require('../data')
const {validationResult} = require('express-validator');
const req = require('express/lib/request');
const bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => {
        res.render('users/login', { //login.ejs
            title: "Login",
            session: req.session
        }) 
    },
    processLogin:(req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){

            let user = getUsers.find(user => user.email === req.body.email);

            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                rol: user.rol,
                image:user.image
            }

            /* cookie */
            if(req.body.recordar){
                const TIME_IN_MILISECONDS = 60000;
                res.cookie('saCookie', req.session.user, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                })
                
            }

            res.locals.user = req.session.user
            
            res.redirect("perfil") 
        }else{
            res.render('users/login', {
                title: "Login",
                errors: errors.mapped(),
                session:req.session
        })}

    },

    profile : (req, res)=>{
        
        res.render('users/profile', { //profile.ejs
            title: "Mi perfil",
            session: req.session
        }) 
    },
    register: (req, res) => {
        res.render('users/register', { //register.ejs
            title: "Register",
            session: req.session
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
           password: bcrypt.hashSync(req.body.password, 10), 
           image:req.file ? req.file.filename : "default-image.png",
           rol: "USER"
        
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
                old: req.body,
                session: req.session
            })
        }

    },
    leaveSession: (req, res) => {
        /* eliminamos session */
        req.session.destroy();

        /* eliminamos cookie */
        if(req.cookies.saCookie){
            res.cookie('saCookie', '', {maxAge: -1}) 
        }
        res.redirect('/')
    }
}