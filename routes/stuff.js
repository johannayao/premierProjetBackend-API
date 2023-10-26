const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');
const multerConfig = require('../middlleware/multer-config');

router.get('/get', auth, stuffCtrl.getAllStuff);
 router.post('/create', auth, multer,  stuffCtrl.createThing);
router.get('/getById/:id', auth, stuffCtrl.getOneThing);
router.put('/update/:id', auth,multer, stuffCtrl.modifyThing);
router.delete('/delete/:id', auth, stuffCtrl.deleteThing);

module.exports = router;