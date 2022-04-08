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
    }
}