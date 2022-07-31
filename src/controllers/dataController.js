
const nodemailerTransporter=require("../functions/nodemailer")


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
    },contactMail:(req, res) =>{
        let {name,email,phone,comments}=req.body;

        let mailOptions={
        from:email,
        to:"sixapplesstore@gmail.com",
        subject:`${name} te ha enviado una consulta`,
        html:`<h1>Formulario de consulta</h1>
        <ul>
            <li>Nombre:${name}</li>
            <li>Telefono:${phone}</li>
            <li>Correo electronico:${email}</li>
        </ul>
        <p>La consulta enviada es: ${comments}</p>`
        }
        nodemailerTransporter.sendMail(mailOptions,(err,data)=>{

            console.log('email enviado')
            res.redirect('/')
        })
    },
    protection: (req, res) => {
        res.render('footerData/dataProtection', {
            title: "Protección de datos personales",
            session: req.session
        })
    }
}
