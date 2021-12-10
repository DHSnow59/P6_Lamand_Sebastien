//importation d'express
const express = require('express');
//importation d'email depuis middleware
const email = require('../middleware/email');
// importation password depuis middleware
const password = require('../middleware/password');

// Création du router
const router = express.Router();
const userCtrl = require('../controllers/user');

// Routeur pour la création utilisateur 
router.post('/signup', email, password, userCtrl.signup);
// Routeur pour l'identification d'utilisateur 
router.post('/login', userCtrl.login);

//exportation du router
module.exports = router;