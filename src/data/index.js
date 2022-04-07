const fs = require('fs');
const path = require('path');

module.exports = {
    getProducts: JSON.parse(fs.readFileSync(path.join(__dirname, "/products.json"), "utf-8")), /* busco el json original y lo 'transformo a objeto */
    writeProducts: (data) => {
        fs.writeFileSync(path.join(__dirname, "/products.json"), JSON.stringify(data)); /* al json original (q es objeto) le sobrescribo los nuevos datos, y lo paso a formato json */
    },
    getUsers: JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8")),
    writeUsers: (data) => {
        fs.writeFileSync(path.join(__dirname, "/users.json"), JSON.stringify(data));
    },
    getCategories: JSON.parse(fs.readFileSync(path.join(__dirname, "/categories.json"), "utf-8")), 
    writeCategories: (data) => {
        fs.writeFileSync(path.join(__dirname, "/categories.json"), JSON.stringify(data));
    },
}