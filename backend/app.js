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




//Exportation de l'application pour y accéder depuis les autres fichiers
module.exports = app;