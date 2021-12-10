//------------------- Création application Express -----------------//

//Création de constante pour importer express
const express = require('express');
//Création de constante app qui contiendra l'application
const app = express();
// Importation de mongoose
const mongoose = require('mongoose');
// Importation router
const stuffRoutes = require('./routes/stuff');
//Importation de path
const path = require('path');
//Importation de la sécurité helmet
const helmet = require("helmet");
// Importation de la sécurité express-rate-limit
const rateLimit = require("express-rate-limit");

const limiteur = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 100, // limite chaque IP à 100 requêtes par windowMs
    message: "Vous avez effectué plus de 100 requétes dans une limite de 24 heures!"
});

// Connection de API a la base de données
mongoose.connect('mongodb+srv://DHSnow:test@cluster0.ukhtb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Importation du router user
const userRoutes = require('./routes/user');

//---------- Création de MiddleWare ------------------//

app.use(express.json());
// Autorisation CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

//Nous voulons enregistrer notre routeur pour toutes les demandes effectuées vers /api/stuff
app.use('/api/sauces', stuffRoutes);

// Enregistrement des routes lié a l'authentification
app.use('/api/auth', userRoutes);

//Ajout de sécurité à un serveur Express
app.use(helmet());

// applique un limitateur de nombre de requêtes envoyées vers un serveur Express.
app.use(limiteur);


//Exportation de l'application pour y accéder depuis les autres fichiers
module.exports = app;