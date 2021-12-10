// Importation de mongoose
const mongoose = require('mongoose');

// Importation de mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

//Création de notre schéma pour les Users
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
// Nous permet d'exporter notre model user
module.exports = mongoose.model('User', userSchema);