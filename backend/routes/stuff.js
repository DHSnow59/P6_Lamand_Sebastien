const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
//Enregistrement des Sauces dans la base de données
router.post('/', stuffCtrl.createSauce);

//Mettez à jour une sauce existant
router.put('/:id', stuffCtrl.modifySauce);
// Suppression d'une sauce
router.delete('/:id', stuffCtrl.deleteSauce);
//Récupération d'une sauce spécifique
router.get('/:id', stuffCtrl.getOneSauce);
//Récupération de la liste des sauces en vente
router.get('/', stuffCtrl.getAllSauce);

module.exports = router;