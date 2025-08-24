import { useCallback, useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, changeErrorState } from "../store/moviesSlice";

const useMovies = (API, category) => {
  const dispatch = useDispatch();
  const moviesCategory = useSelector((store) => store?.movies?.[category]);

  const getMovies = useCallback(async () => {
    try {
      const response = await fetch(API, MOVIE_API_OPTIONS);
      const json = await response.json();

      if (!json.results || json.results.length === 0) {
        console.warn(`No movies found for category: ${category}`);
        dispatch(changeErrorState(true));
        return;
      }

      dispatch(
        addMovies({
          category,
          movies: json.results,
        })
      );
      dispatch(changeErrorState(false));
    } catch (error) {
      console.error("Error Fetching movies:", error);
      dispatch(changeErrorState(true));
    }
  }, [API, category, dispatch]);

  useEffect(() => {
    if (!moviesCategory) {
      getMovies();
    }
  }, [getMovies, moviesCategory]);

  // ✅ Return so components can use if not only Redux
  return moviesCategory;
};

export default useMovies;
