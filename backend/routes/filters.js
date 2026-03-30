const express = require('express');
const router = express.Router();
const { getGenres, getYears } = require('../controllers/filterController');

// GET /api/filters/genres
router.get('/genres', getGenres);

// GET /api/filters/years
router.get('/years', getYears);

module.exports = router;
