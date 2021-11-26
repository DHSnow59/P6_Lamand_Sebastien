const mongoose = require('mongoose');

//Schema
const thingSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, require: true },
    manufacturer: { type: String, require: true },
    description: { type: String, require: true },
    mainPepper: { type: String, require: true },
    imageUrl: { type: String, require: true },
    heat: { type: Number, require: true },
    likes: { type: Number, require: true },
    dislikes: { type: Number, require: true },
    usersLiked: { type: ["String <userId>"], require: true },
    usersDisliked: { type: ["String <userId>"], require: true },
});

module.exports = mongoose.model('Thing', thingSchema);