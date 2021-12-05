const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            if (!sauce) {
                res.status(404).json({
                    error: new Error('No such sauce !')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                res.status(400).json({
                    error: new Error('requete non autorisé !')
                });
            }
            Sauce.deleteOne({ _id: req.params.id }).then(
                () => {
                    res.status(200).json({
                        message: 'Supprimé!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }
    )
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

exports.likeAndDislike = (req, res, next) => {
    const like = req.body.like;
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
    } else if (like === -1) {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                let dislike = sauce;
                dislike.dislikes++;
                dislike.usersDisliked.push(req.body.userId);
                Sauce.updateOne({ _id: req.params.id }, { dislikes: dislike.dislikes, usersDisliked: dislike.usersDisliked, _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Tu dislike ce produit !" }))
                    .catch((error) => res.status(400).json({ error }));

            })
    } else if (like === 0) {

    }
};