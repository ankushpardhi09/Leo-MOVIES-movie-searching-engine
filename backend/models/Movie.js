const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    imdbID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    Title: {
      type: String,
      required: true,
      index: true,
    },
    Year: {
      type: String,
    },
    Rated: {
      type: String,
    },
    Released: {
      type: String,
    },
    Runtime: {
      type: String,
    },
    Genre: {
      type: String,
      index: true,
    },
    Director: {
      type: String,
    },
    Writer: {
      type: String,
    },
    Actors: {
      type: String,
    },
    Plot: {
      type: String,
    },
    Language: {
      type: String,
    },
    Country: {
      type: String,
    },
    Awards: {
      type: String,
    },
    Poster: {
      type: String,
    },
    Ratings: [
      {
        Source: String,
        Value: String,
      },
    ],
    Metascore: {
      type: String,
    },
    imdbRating: {
      type: String,
      index: true,
    },
    imdbVotes: {
      type: String,
    },
    Type: {
      type: String,
    },
    DVD: {
      type: String,
    },
    BoxOffice: {
      type: String,
    },
    Production: {
      type: String,
    },
    Website: {
      type: String,
    },
    Response: {
      type: String,
    },
    cachedAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 7, // Cache for 7 days
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.index({ Title: 'text', Plot: 'text', Actors: 'text' });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
