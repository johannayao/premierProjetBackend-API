const mongoose = require('mongoose');
const Livre = mongoose.Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  image: { type: String, required: true },
  prix: { type: Number, required: true },
});
module.exports = mongoose.model('livre', Livre);