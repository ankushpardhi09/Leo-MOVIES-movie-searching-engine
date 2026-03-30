const express = require('express');
const router = express.Router();
const { search, getMovie, getSuggestions } = require('../controllers/movieController');

// GET /api/movies/search?q=batman&page=1
router.get('/search', search);

// GET /api/movies/suggestions?q=bat
router.get('/suggestions', getSuggestions);

// GET /api/movies/:id
router.get('/:id', getMovie);

module.exports = router;
