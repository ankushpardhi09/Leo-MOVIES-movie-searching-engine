const Movie = require('../models/Movie');

/**
 * Get all unique genres from cached movies
 */
const getGenres = async (req, res, next) => {
  try {
    const movies = await Movie.find({ Genre: { $exists: true, $ne: '' } }, { Genre: 1 });

    const genreSet = new Set();
    movies.forEach((movie) => {
      if (movie.Genre) {
        movie.Genre.split(', ').forEach((g) => genreSet.add(g.trim()));
      }
    });

    const genres = Array.from(genreSet).sort();
    return res.json({ genres });
  } catch (error) {
    next(error);
  }
};

/**
 * Get available years from cached movies
 */
const getYears = async (req, res, next) => {
  try {
    const movies = await Movie.find({ Year: { $exists: true, $ne: '' } }, { Year: 1 });

    const yearSet = new Set();
    movies.forEach((movie) => {
      if (movie.Year) {
        // Handle ranges like "2019–2023"
        const year = movie.Year.split('–')[0].trim();
        if (/^\d{4}$/.test(year)) {
          yearSet.add(year);
        }
      }
    });

    const years = Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
    return res.json({ years });
  } catch (error) {
    next(error);
  }
};

module.exports = { getGenres, getYears };
