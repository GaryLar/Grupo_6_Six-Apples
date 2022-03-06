const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => console.log(`servidor levantado en el puerto ${port} http://localhost:${port}`))

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, './views/home.html'))
)