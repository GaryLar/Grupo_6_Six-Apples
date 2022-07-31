const nodemailer=require("nodemailer")

let transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        type: 'OAuth2',
        user: "sixapplesstore@gmail.com",
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:"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",
        refreshToken:"1//04wppJ9IJN2ABCgYIARAAGAQSNwF-L9IrZwYblG-y3ZZcC1fMKQAIuxrQQNKddOzxkCCB82Rjm7UsCtDd_qrOs5lg4EN7qMZ4gHU",
        accessToken: process.env.ACCESS_TOKEN
    }
})

module.exports=transporter
