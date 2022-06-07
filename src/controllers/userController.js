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
        db.User.findOne({
            where: {
                id
            },
        })
        .then((user) => {
            res.render('users/profile', {
                title: "Perfil",
                user,
                session: req.session,
                old: req.body
            })
        })
        .catch(error => res.send(error))
    },
    profileEdit : (req, res)=>{
        let id = +req.session.user.id;
        db.User.findOne({
            where: {
                id
            }
        })
        .then((user) => {
            res.render('users/profileEdit', {
                title: "Perfil",
                user,
                session: req.session,
                old: req.body
            }) 
        })
        .catch(error => res.send(error))
    },
    profileUpdate: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            db.User.update({
                ...req.body
                /* name: req.body.name,
                dni: +req.body.dni,
                phone: +req.body.phone,
                postcode: +req.body.postcode,
                province: req.body.province,
                district: req.body.district,
                direction: req.body.direction,
                number: +req.body.number,
                image: req.file ? req.file.filename : image */
            },{
                where: {
                    id: req.session.user.id
                }
            })
            .then(() => 
                res.redirect('/') 
            )
            .catch(error => res.send(error))
        }else{
            db.User.findOne({
                where: {
                    id: req.session.user.id
                }
            })
            .then(() => {
                res.render('users/profileEdit', {
                    title: "EditarPerfil",
                    session: req.session,
                    old: req.body,
                    errors: errors.mapped()
                }) 
            })
        }

        /* getUsers.forEach(user => {
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
        res.redirect('/');  */
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