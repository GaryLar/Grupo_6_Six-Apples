const fs = require('fs');
const path = require('path');

module.exports = {
    getProducts: JSON.parse(fs.readFileSync(path.join(dirname, "/products.json"), "utf-8")),
    writeProducts: (data) => {
        fs.writeFileSync(path.join(dirname, "/products.json"), JSON.stringify(data));
    },
    getCategories: JSON.parse(fs.readFileSync(path.join(dirname, "/categories.json"), "utf-8")),
    getUsers: JSON.parse(fs.readFileSync(path.join(dirname, "/users.json"), "utf-8")),
    writeUsers: (data) => {
        fs.writeFileSync(path.join(dirname, "/users.json"), JSON.stringify(data));
    },
}