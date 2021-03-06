const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const productController = require("../controllers/userController");
const uploadFile = require ('../middlewares/uploadAvatar');
const registerValidator = require('../validations/register-valid')
const loginValidator = require("../validations/login-valid")
const checkUserInSession = require("../middlewares/checkUserInSession")
const checkUserSession = require("../middlewares/checkUserSession")
const profileValidator = require("../validations/profile-valid")


/* Ruta para mostrar formularios */
router.get('/login', checkUserInSession, userController.login);
router.post("/login",loginValidator,userController.processLogin) 
router.get('/registro', checkUserInSession, userController.register);
router.post('/registro',uploadFile.single('image'), registerValidator, userController.processRegister);

router.get('/perfil', checkUserSession, userController.profile);
router.get('/perfil/editar/:id', checkUserSession, userController.profileEdit);
router.put('/perfil/editar/:id', uploadFile.single('image'), profileValidator, checkUserSession, userController.profileUpdate);
/* get leaveSession */
router.get('/salir', userController.leaveSession);
module.exports = router;