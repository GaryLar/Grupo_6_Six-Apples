const checkAdmin = (req, res, next) => {
    if(req.session.user.rol === "ADMIN") {
        next()
    }else{
        res.redirect("/")
    }
}

module.exports = checkAdmin;