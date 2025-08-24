import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "Now Playing": null,
  Popular: null,
  "Top Rated": null,
  Upcoming: null,
  Action: null,
  Adventure: null,
  Animation: null,
  Crime: null,
  Comedy: null,
  Documentary: null,
  Drama: null,
  Family: null,
  Fantasy: null,
  History: null,
  Horror: null,
  Music: null,
  Mystery: null,
  Romance: null,
  "Science Fiction": null,
  "TV Movies": null,
  Thriller: null,
  War: null,
  Western: null,
  heroMovieTrailer: {
    trailerDetails: null,
    youtubeKeyDetails: null,
  },
  error: true,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    changeErrorState: (state, action) => {
      state.error = action.payload;
    },
    addMovies: (state, action) => {
      const { category, movies } = action.payload;
      state[category] = movies;
    },
    // Specific actions for hero movie trailer
    addHeroMovieTrailerDetails: (state, action) => {
      state.heroMovieTrailer.trailerDetails = action.payload;
    },
    addHeroMovieTrailerYoutubeKey: (state, action) => {
      state.heroMovieTrailer.youtubeKeyDetails = action.payload;
    },
  },
});

export const {
  addMovies,
  addHeroMovieTrailerDetails,
  addHeroMovieTrailerYoutubeKey,
  changeErrorState,
} = moviesSlice.actions;
export default moviesSlice.reducer;
