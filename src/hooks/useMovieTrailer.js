import { useCallback, useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addHeroMovieTrailerYoutubeKey } from "../store/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieClips = useCallback(async () => {
    if (!movieId) return; // ✅ do nothing if no movieId

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        MOVIE_API_OPTIONS
      );

      if (!response.ok) {
        console.error("❌ TMDB API Error:", response.status, response.statusText);
        return; // stop further execution if API fails
      }

      const json = await response.json();

      if (!json.results || json.results.length === 0) {
        console.warn("⚠️ No videos found for movie:", movieId, json);
        return;
      }

      const trailers = json.results.filter((video) => video.type === "Trailer");
      const randomIndex = Math.floor(Math.random() * trailers.length);
      const trailerDetails =
        trailers.length !== 0 ? trailers[randomIndex] : json.results[0];

      dispatch(addHeroMovieTrailerYoutubeKey(trailerDetails));
    } catch (error) {
      console.error("❌ Error while fetching Movie Clips:", error);
    }
  }, [movieId, dispatch]);

  useEffect(() => {
    getMovieClips(); // ✅ always refetch if movieId changes
  }, [getMovieClips]);
};

export default useMovieTrailer;
