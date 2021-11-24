const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
//Enregistrement des Things dans la base de données
router.post('/', stuffCtrl.createThing);

//Mettez à jour un Thing existant
router.put('/:id', stuffCtrl.modifyThing);
// Suppression d'un Thing
router.delete('/:id', stuffCtrl.deleteThing);

//Récupération d'un Thing spécifique
router.get('/:id', stuffCtrl.getOneThing);

// nous lui passons un string, correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware.
//Récupération de la liste de Things en vente
router.get('/', stuffCtrl.getAllThing);

module.exports = router;