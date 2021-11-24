//importation d'express
const express = require('express');
// Création du router
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//exportation du router
module.exports = router;