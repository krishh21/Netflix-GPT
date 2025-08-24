export const BG_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/85ff76db-39e5-423a-afbc-97d3e74db71b/null/IN-en-20240909-TRIFECTA-perspective_b22117e0-4610-4d57-a695-20f77d241a4a_large.jpg";

export const NETFLIX_LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR =
  "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp";

export const MOVIE_API_POPULAR_MOVIES =
  "https://api.themoviedb.org/3/movie/popular?page=1";

export const MOVIE_API_NOW_PLAYING_MOVIES =
  "https://api.themoviedb.org/3/movie/now_playing?page=1";

export const MOVIE_API_TOP_RATED_MOVIES =
  "https://api.themoviedb.org/3/movie/top_rated?page=1";

export const MOVIE_API_UPCOMING_MOVIES =
  "https://api.themoviedb.org/3/movie/upcoming?page=1";

export const MOVIE_API_GENRE =
  "https://api.themoviedb.org/3/discover/movie?page=1";

export const MOVIE_IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

export const SEARCH_BY_MOVIE_NAME_FIRST_PART =
  "https://api.themoviedb.org/3/search/movie?query=";

export const SEARCH_BY_MOVIE_NAME_LAST_PART = "&include_adult=false&page=1";

export const MOVIE_API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDZlOTZlNGVkZjEyMDdlM2RmNTRjZDgxMmRlMzViMiIsIm5iZiI6MTc1NTY4MTc2Mi43MTksInN1YiI6IjY4YTU5M2UyZWQyZTg5ZTI0NmE4MThiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hw-DkoJTyDhXKHb5wtCs9SSBsbFzfabzFwtjAkSo02o",

  },
};

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
export const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;
