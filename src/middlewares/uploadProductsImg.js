const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../../public/images/productos"))
    },
    filename:function(req,file,cb){
        cb(null, "producto-"+Date.now()+path.extname(file.originalname)) }
})

const upload=multer({storage:storage})

module.exports=upload;
