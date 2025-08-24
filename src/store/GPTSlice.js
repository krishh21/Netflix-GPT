import { createSlice } from "@reduxjs/toolkit";

const GPTSlice = createSlice({
  name: "GPT",
  initialState: {
    showGPTSearch: false,
    movieResults: null,
    movieNames: null,
    userSearching: false,
    isLoading: false,
  },
  reducers: {
    toggleGPTSearchView: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    toggleIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    addUserSearching: (state) => {
      state.userSearching = true;
    },
    addGPTMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    removeGPTMovieResult: (state) => {
      state.movieResults = null;
      state.movieNames = null;
      state.userSearching = false;
    },
  },
});

export const {
  toggleGPTSearchView,
  addUserSearching,
  addGPTMovieResult,
  removeGPTMovieResult,
  toggleIsLoading,
} = GPTSlice.actions;
export default GPTSlice.reducer;
