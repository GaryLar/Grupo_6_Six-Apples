module.exports={
    index:(req,res)=>{
        res.render('home.ejs',{
            title: "Six Apples"
        }) //home.ejs
    },
    about:(req,res)=>{
        res.render('quienessomos', {
            title: "Quienes Somos"
        }) //quienessomos.ejs
    }
}