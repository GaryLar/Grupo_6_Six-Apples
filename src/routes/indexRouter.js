const express = require("express")
const router = express.Router()
const indexController = require("../controllers/indexController")

/* Ruta para mostrar el home */
router.get('/', indexController.index);
router.get('/about', indexController.about);
router.get('/search', indexController.search); /* not complete function */

module.exports = router;