const emailValidator = require('email-validator');
// Création du regex de vérification pour la validation de l'email 
const regexEmail = /^[A-Za-z0-9](([.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*).([A-Za-z]{2,})$/

// Contrôle de l'input email via regex & email-validator pour une conformité de l'email avant cryptage.
module.exports = (req, res, next) => {
    if (regexEmail.test(req.body.email) && (emailValidator.validate(req.body.email))) {
        next();
    } else {
        return res.status(401).json({ message: 'Veuillez saisir une adresse email valide' });
    }
};