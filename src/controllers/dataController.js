module.exports = {
    privacy: (req, res) => {
        res.render('footerData/privacyPolicy', {
            title: "Política de Privacidad"
        })
    },
    contact: (req, res) => {
        res.render('footerData/contact', {
            title: "Contacto"
        })
    },
    protection: (req, res) => {
        res.render('footerData/dataProtection', {
            title: "Protección de datos personales"
        })
    }
}