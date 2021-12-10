const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création d'une nouvelle sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        // On initialise les likes/dislikes et les tableaux likes/dislikes a 0  
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (req.file) {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const sauceObject = req.file ? {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : {...req.body };
                    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {
                const sauceObject = req.body;
                Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));

};

//Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};

// Ajout d'un like ou dislike a la sauce
exports.likeAndDislike = (req, res, next) => {
    const like = req.body.like;
    // Ajout d'un like a la sauce
    if (like === 1) {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                let like = sauce;
                like.likes++;
                like.usersLiked.push(req.body.userId);
                Sauce.updateOne({ _id: req.params.id }, { likes: like.likes, usersLiked: like.usersLiked, _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Tu like ce produit !" }))
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
        // Ajout d'un  dislike a la sauce
    } else if (like === -1) {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                let dislike = sauce; // On crée un clone de l'objet sauce 
                dislike.dislikes++; // On ajoute un like à l'objet 
                dislike.usersDisliked.push(req.body.userId);
                Sauce.updateOne({ _id: req.params.id }, { dislikes: dislike.dislikes, usersDisliked: dislike.usersDisliked, _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Tu dislike ce produit !" }))
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
    } else if (like === 0) {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                // On utilise includes pour trouver si l'utilisateur ce trouve usersLiked ou usersDisliked
                if (sauce.usersLiked.includes(req.body.userId)) {
                    let unlike = sauce; // On crée un clone de l'objet sauce 
                    unlike.likes--; // On enlève un like à l'objet 
                    const index = unlike.usersLiked.indexOf(req.body.userId); // On utilise indexOf pour trouver la position de l'utilisateur dans le [] 
                    unlike.usersLiked.splice(index, 1); // On utilise l'index pour supprimer l'utilisateur du [] grace a la méthode slice
                    Sauce.updateOne({ _id: req.params.id }, { likes: unlike.likes, usersLiked: unlike.usersLiked }) // On update la sauce grace au clone que nous avons édité 
                        .then(() => res.status(200).json({ message: "Tu as enlevé ton like de ce produit !" }))
                        .catch((error) => res.status(400).json({ error }));
                    // On utilise includes pour trouver si l'utilisateur ce trouve usersLiked ou usersDisliked
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    let unDislike = sauce;
                    unDislike.dislikes--;
                    const index = unDislike.usersDisliked.indexOf(req.body.userId);
                    unDislike.usersDisliked.splice(index, 1);
                    Sauce.updateOne({ _id: req.params.id }, { dislikes: unDislike.dislikes, usersDisliked: unDislike.usersDisliked })
                        .then(() => res.status(200).json({ message: "Tu as enlevé ton Dislike de ce produit !" }))
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(500).json({ error }));
    }
};