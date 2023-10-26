const bcrypt = require("bcrypt");
//on importe notre models userShema
const Users = require("../models/user.js");
const Jwt = require("jsonwebtoken");
// const { json } = require("body-parser");



  exports.signup =  (req, res) => {
    console.log(req.body);
    try {
      if(req.body.password !== req.body.passwordC)return res.status(203).json({message :'mot de pass pas conform'});
      Users.findOne({email:req.body.email})
      .then(user=>{
        if(user)return res.status(203).json({message:'utilisateurs exist'})
        bcrypt.hash(req.body.password,10)
      
       .then(hash=>{
        req.body.password = hash;
        //on enregistre l'utilisateurs
        Users.create(req.body)
        .then(newUser=>res.status(202).json({message :'utilisateurs créé avec succès', newUser}))
       })
      })
    } catch(error) {
      res.status(500).json({message:'not found'})
    }
};







exports.login = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then(newUser => {
      console.log(req.body);
        if (!newUser) {
          return res.status(200).json({ message: 'mot de passe incorrecte' });
        }
        
      // Utilisez bcrypt.compare pour comparer le mot de passe fourni avec le mot de passe haché dans la base de données
      bcrypt.compare(req.body.password, newUser.password)
        .then(avalid => {
          if (avalid) {
            const token = Jwt.sign(
              { newUserId: newUser._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' } // Corrigez la faute de frappe ici : 'expiresIn'
              
            );
            return res.status(201).json({ message: 'mot de passe correcte', token });
          }else{
            return res.status(401).json({ message: 'mot de passe incorrecte' });
          }

          // Si le mot de passe est valide, générez un jeton JWT et envoyez-le dans la réponse
          

        })
        .catch(error => {
          console.log(error)
          res.status(400).json({ message:'not founds' })
        });
    })
    .catch(error => {
      console.log(error)
          res.status(500).json({ message:'not founds' })
    });
};


