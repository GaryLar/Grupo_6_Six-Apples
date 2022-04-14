const {getUsers, writeUsers} = require('../data')
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
           avatar: ""
       }
       // Paso 2 - Guardar el nuevo usuario en el array de usuarios
       getUsers.push(newUser)

       /* Paso 3- sobreescribir JSON */
       writeUsers(getUsers)

       /* Paso 4-redireccion */
       res.redirect('/usuario/login')

    }
}