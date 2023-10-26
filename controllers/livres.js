const Livre = require("../models/livre.js");
const Users = require("../models/user.js");

class LivreController{
    static async creer(req, res){
        try {
            console.log(req.auth);
            const isUser = await Users.findOne({_id: req.auth._id,email: req.auth.email});
            if(!isUser) return res.status(203).json({message:"email ou mot de passe incorrecte", status: false})
            const isLivre = await Livre.findOne({titre: req.body.titre,auteur: req.body.auteur});
            if(isLivre)return res.status(203).json({message :"ce livres est dejà ajouté", status: false});
            if(req.file){
                req.body.image = req.protocol+"://"+req.get("host")+"/"+req.file.path;
            }
            const newLivre = await Livre.create(req.body);
            console.log(newLivre);
            res.status(201).json({message:"livre ajouté avec succès", data: newLivre, status: true});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"une erreur s'est produite lors de l'enregistrement", error: error.message,status: false})
        }
    }

    static async getAll(req, res){
        try {
            const allLivre = await Livre.find();
            res.status(201).json({message:"livre trouvé(s)", data: allLivre});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"une erreur s'est produite lors de l'enregistrement", error: error.message})
        }
    }
}


module.exports = LivreController;