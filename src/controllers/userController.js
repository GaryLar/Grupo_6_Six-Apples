module.exports={
    login:(req,res)=>{
        res.render('users/login') //login.ejs
    },
    profile:(req,res)=>{
        res.render('users/profile') //profile.ejs
    },
    register:(req,res)=>{
        res.render('users/register') //register.ejs
    }
}