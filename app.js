const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');

/* requerimos dotenv para la variable de entorno */
require('dotenv').config();
const port = process.env.port || 3000;

/* config de archivos estaticos */
app.use(express.static('public'));

/* views ejs config  */
app.set('view engine', 'ejs')
app.set('views', 'src/views')

/* servidor escuchando */
app.listen(port, () => console.log(`servidor levantado en el puerto ${port} http://localhost:${port}`))


app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, './views/home.html'))
)

app.get('/login', (req, res) => 
    res.sendFile(path.join(__dirname, './views/login.html'))
)

app.get('/register', (req, res) => 
    res.sendFile(path.join(__dirname, './views/register.html'))
)

app.get('/carrito', (req, res) => 
    res.sendFile(path.join(__dirname, './views/productCart.html'))
)

app.get('/detallesProductos', (req, res) => 
    res.sendFile(path.join(__dirname, './views/productDetail.html'))
)

app.get('/quienessomos', (req, res) => 
    res.sendFile(path.join(__dirname, './views/quienessomos.html'))
)

app.get('/catalogo', (req, res) => 
    res.sendFile(path.join(__dirname, './views/catalogo.html'))
)

app.get('/ofertas', (req, res) => 
    res.sendFile(path.join(__dirname, './views/ofertas.html'))
)

app.get('/admin', (req, res) => 
    res.sendFile(path.join(__dirname, './views/admin/products/addProduct.html'))
)

app.get('/profile', (req, res) => 
    res.sendFile(path.join(__dirname, './views/profile.html'))
)