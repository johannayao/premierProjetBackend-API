 const express = require('express')
 const app = express();
 const mongoose = require('mongoose')
 const bodyParser = require('body-parser')
 let cors = require('cors');
 const path = require('path');


   mongoose.connect('mongodb+srv://yaojohanna2003:johanna@cluster0.4rnwdve.mongodb.net/?retryWrites=true&w=majority',
   { useNewUrlParser: true,
    useUnifiedTopology: true })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const routerUser = require('./routes/user.js');
  const RouterLivre = require('./routes/livre.js'); 
const RouterLogin = require('./routes/login.js');
const { log } = require('console');
  
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/user', routerUser);
  app.use("/api/livre",RouterLivre);
 app.use("/api/librairie",RouterLogin)
  
  module.exports= app;



