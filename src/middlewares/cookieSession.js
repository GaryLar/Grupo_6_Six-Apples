
const cookieSession = (req, res, next) => {
    if(typeof req.cookies !== "undefined"){
        if(req.cookies.saCookie){
            req.session.user = req.cookies.saCookie;
            res.locals.user = req.session.user;

        }
        next();
    }
}

module.exports = cookieSession;