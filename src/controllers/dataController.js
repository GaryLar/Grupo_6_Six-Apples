module.exports = {
    privacy: (req, res) => {
        res.render('footerData/privacyPolicy', {
            title: "Política de Privacidad",
            session: req.session
        })
    },
    contact: (req, res) => {
        res.render('footerData/contact', {
            title: "Contacto",
            session: req.session
        })
    },
    protection: (req, res) => {
        res.render('footerData/dataProtection', {
            title: "Protección de datos personales",
            session: req.session
        })
    }
}