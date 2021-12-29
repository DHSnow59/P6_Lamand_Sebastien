// Importation jwt
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    // De nombreux problèmes peuvent se produire, nous insérons tout à l'intérieur d'un bloc try...catch ;
    try {
        //Nous extrayons le token du header Authorization de la requête entrante
        //Nous utilisons donc la fonction split pour récupérer tout après l'espace dans le header
        const token = req.headers.authorization.split(' ')[1];
        // Nous utilisons ensuite la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée ;
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Nous extrayons l'ID utilisateur de notre token 
        const userId = decodedToken.userId;
        req.auth = { userId };
        //Si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. S'ils sont différents, nous générons une erreur
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
            //Sinon notre utilisateur est authentifié. Nous passons l'exécution à l'aide de la fonction next() .
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requete non authentifiée !' });
    }
};