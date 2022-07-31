const express = require("express")
const router = express.Router()
const indexController = require("../controllers/indexController")
const dataController = require('../controllers/dataController')


/* Ruta para mostrar el home */
router.get('/', indexController.index);
router.get('/about', indexController.about);
router.get('/search', indexController.search); 

/* Ruta para mostrar vistas de footer */
router.get('/politica-de-privacidad', dataController.privacy);
router.get('/contacto', dataController.contact);
router.post('/contacto', dataController.contactMail);
router.get('/proteccion-datos-personales', dataController.protection);
module.exports = router;