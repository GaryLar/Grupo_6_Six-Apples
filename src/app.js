const express = require('express');
const app = express();
const path = require('path');
/* requerimos dotenv para la variable de entorno */
require('dotenv').config();
const port = process.env.port || 3000;
const methodOverride = require('method-override');
const  session =require("express-session")



/* Enrutadores */
const indexRouter = require("./routes/indexRouter")
const productRouter = require("./routes/productsRouter")
const userRouter = require("./routes/userRouter")
const adminRouter = require("./routes/adminRouter")


/* config de archivos estaticos */
app.use(express.static('public'));
app.use(express.urlencoded({extended: false})); /* para capturar aquello q vienen del formulario en forma de objeto literal */
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
    secret:"formar",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

/* views ejs config  */
app.set('view engine', 'ejs')
app.set('views', 'src/views')

/* Middlewares de Rutas */
app.use("/",indexRouter)  //Home , About
app.use("/productos", productRouter)  //Productos: carrito, detalle, catalogo, ofertas.
app.use("/usuario", userRouter) //Usuario: perfil, registro.
app.use("/admin", adminRouter) //admin, CRUD products, users, categorias

/* COLOCAR ruta de error 404 */



/* servidor escuchando */

app.listen(port, () => console.log(`servidor levantado en el puerto ${port} http://localhost:${port}`))
