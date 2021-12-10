// Importation de password
const PasswordValidator = require('password-validator');
// Création du regex de vérification pour la validation du mot de passe 
const regexPassword = /^(?=.*[0-9]{2,})(?=.*[a-z]{2,})(?=.*[A-Z]{1,})([a-zA-Z0-9]{7,})$/

const schema = new PasswordValidator();

schema
    .is().min(7) // Minimum 7 caractères
    .has().uppercase(1) // Min 1 Majuscule
    .has().lowercase(2) // Min 2 minuscules 
    .has().digits(2) // Min 2 chiffres
    .has().not().spaces() // Pas D'espace autorisé



// Contrôle de l'input password via regex & password-validator pour une conformité du password avant cryptage.
module.exports = (req, res, next) => {
    if (regexPassword.test(req.body.password) && (schema.validate(req.body.password))) {
        next();
    } else {
        return res.status(401).json({ message: 'Veuillez saisir un mot de passe avec 7 caractères minimum donc 1 majuscule 2 chiffres ' });
    }
};