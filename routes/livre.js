const express = require("express");
const LivreController = require("../controllers/livres");
const telecharger = require("../middlleware/multer-config");
const veriFyToken = require("../middlleware/auth");
const RouterLivre = express.Router();

 

RouterLivre.post("/creer", veriFyToken, telecharger, LivreController.creer);
RouterLivre.get("/getAll",  LivreController.getAll);

module.exports = RouterLivre;