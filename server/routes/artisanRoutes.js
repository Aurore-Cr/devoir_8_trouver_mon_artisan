const express = require('express');
const router = express.Router();
const { getAllArtisans, getTopArtisans, getArtisanById } = require('../controllers/artisanController');
const { contactValidationRules } = require('../middlewares/validators');
const { contactArtisan } = require('../controllers/contactController');

router.get('/', getAllArtisans);
router.get('/top', getTopArtisans);
router.get('/:id', getArtisanById);
router.post('/:id/contact', contactValidationRules, contactArtisan);

module.exports = router;
