module.exports={
    index:(req,res)=>{
        res.render("home.ejs")
    },
    about:(req,res)=>{
        res.render("quienessomos.ejs")
    }
}