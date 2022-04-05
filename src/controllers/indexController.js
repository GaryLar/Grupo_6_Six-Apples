module.exports={
    index:(req,res)=>{
        res.render('home.ejs') //home.ejs
    },
    about:(req,res)=>{
        res.render('quienessomos') //quienessomos.ejs
    }
}