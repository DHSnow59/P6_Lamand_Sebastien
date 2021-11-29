const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
//Enregistrement des Things dans la base de données
router.post('/', stuffCtrl.createSauce);

//Mettez à jour un Thing existant
router.put('/:id', stuffCtrl.modifySauce);
// Suppression d'un Thing
router.delete('/:id', stuffCtrl.deleteSauce);

//Récupération d'un Thing spécifique
router.get('/:id', stuffCtrl.getOneSauce);


//Récupération de la liste de Things en vente
router.get('/', stuffCtrl.getAllSauce);

module.exports = router;