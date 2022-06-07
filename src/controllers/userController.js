const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

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
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    rol: user.rolId,   
                    image:user.image
                }

                /* cookie */
                if(req.body.recordar){
                    const TIME_IN_MILISECONDS = 600000;
                    res.cookie('saCookie', req.session.user, {
                        expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                        httpOnly: true,
                        secure: true
                    }) 
                }
                res.locals.user = req.session.user
                res.redirect("/usuario/perfil")
                })
                .catch((error) => res.send(error))
                }else{
                    res.render('users/login', {
                        title: "Login",
                        errors: errors.mapped(),
                        session:req.session
                })}
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
            db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10), 
                image:req.file ? req.file.filename : "default-image.png",
                rolId: 2 
            })
            .then((user) => {
                res.redirect('/usuario/login')
            })
            .catch((error) => res.send(error))
        }else {
            res.render('users/register', {
                title: "Registro",
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    },
    profile : (req, res)=>{
        let id = +req.session.user.id;
        let user = getUsers.find(user => user.id === id);
        res.render('users/profile', {
            title: "Perfil",
            user,
            session: req.session,
            old: req.body
        })
    },
    profileEdit : (req, res)=>{
        let id = +req.session.user.id;
        let user = getUsers.find(user => user.id === id);
        
        res.render('users/profileEdit', {
            title: "Perfil",
            user,
            session: req.session,
            old: req.body
    
        })  
       
    },
    profileUpdate: (req, res) => {
        let idUser = +req.params.id;
        getUsers.forEach(user => {
            if(user.id === idUser){
                user.name = req.body.name,
                user.dni = +req.body.dni,
                user.phone = +req.body.phone,
                user.postcode = +req.body.postcode,
                user.province = req.body.province,
                user.district = req.body.district,
                user.direction = req.body.direction,
                user.number = +req.body.number,
                user.image = req.file ? req.file.filename : user.image
            }
        })
        writeUsers(getUsers);
        res.redirect('/'); 

         /*   let id = +req.params.id;
        let user = getUsers.find(user => user.id === id)
        let {name, dni, phone, postcode, province, district, direction, number} = req.body

        getUsers.forEach(user => {
            if(user.id === id){
                user.id = user.id
                user.name = name
                user.dni = +dni
                user.phone = +phone
                user.postcode = +postcode
                user.province = province
                user.district = district
                user.direction = direction
                user.number = +number
                user.image = req.file ? req.file.filename : user.image
            }
        })
        writeUsers(getUsers)
        req.session.user = user
        res.redirect('/') */
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