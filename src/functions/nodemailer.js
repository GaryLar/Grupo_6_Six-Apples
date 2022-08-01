const nodemailer=require("nodemailer")

let transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        type: 'OAuth2',
        user: "sixapplesstore@gmail.com",
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN
    }
})

module.exports=transporter
