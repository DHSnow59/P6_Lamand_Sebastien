const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Enregistrement des Sauces dans la base de données
router.post('/', auth, multer, stuffCtrl.createSauce);

// Ajout d'un like ou dislike a la sauce
router.post('/:id/like', auth, stuffCtrl.likeAndDislike);

//Mettez à jour une sauce existant
router.put('/:id', auth, stuffCtrl.modifySauce);
// Suppression d'une sauce
router.delete('/:id', auth, stuffCtrl.deleteSauce);
//Récupération d'une sauce spécifique
router.get('/:id', auth, stuffCtrl.getOneSauce);
//Récupération de la liste des sauces en vente
router.get('/', auth, stuffCtrl.getAllSauce);



module.exports = router;