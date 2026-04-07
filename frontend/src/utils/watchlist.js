const WATCHLIST_STORAGE_KEY = 'watchlist';

const readWatchlist = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

const writeWatchlist = (movies) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(movies));
};

export const getWatchlist = () => readWatchlist();

export const isMovieInWatchlist = (imdbID) =>
  readWatchlist().some((movie) => movie.imdbID === imdbID);

export const addMovieToWatchlist = (movie) => {
  if (!movie?.imdbID) {
    return [];
  }

  const currentWatchlist = readWatchlist().filter((savedMovie) => savedMovie.imdbID !== movie.imdbID);
  const nextWatchlist = [{ ...movie, savedAt: new Date().toISOString() }, ...currentWatchlist];

  writeWatchlist(nextWatchlist);
  return nextWatchlist;
};

export const removeMovieFromWatchlist = (imdbID) => {
  const nextWatchlist = readWatchlist().filter((movie) => movie.imdbID !== imdbID);

  writeWatchlist(nextWatchlist);
  return nextWatchlist;
};
