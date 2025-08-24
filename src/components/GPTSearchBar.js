import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import {
  MOVIE_API_OPTIONS,
  SEARCH_BY_MOVIE_NAME_FIRST_PART,
  SEARCH_BY_MOVIE_NAME_LAST_PART,
} from "../utils/constants";
import {
  addGPTMovieResult,
  addUserSearching,
  toggleIsLoading,
} from "../store/GPTSlice";

// TMDB movie fetch helper
const searchMovieTMDB = async (movie) => {
  const data = await fetch(
    SEARCH_BY_MOVIE_NAME_FIRST_PART + movie + SEARCH_BY_MOVIE_NAME_LAST_PART,
    MOVIE_API_OPTIONS
  );
  const json = await data.json();
  return json.results;
};

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const handleGPTSearch = async () => {
    try {
      if (!searchText.current.value) return;

      dispatch(addUserSearching());
      dispatch(toggleIsLoading());

      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
        searchText.current.value +
        ". Return results in the format: MovieName, Language;MovieName, Language;...";

      // ✅ Call your Vercel backend (OpenAI)
      const response = await fetch("/api/gptSearch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: gptQuery }),
      });

      const data = await response.json();
      const gptResults = data?.result;

      if (!gptResults) throw new Error("No GPT results returned");

      // Split GPT response into movies
      const gptMovies = gptResults.split(";").map((item) => {
        const [movie, lang] = item.split(",").map((str) => str.trim());
        return { movie, lang };
      });

      // Fetch from TMDB
      const promiseArray = gptMovies.map((movieItem) =>
        searchMovieTMDB(movieItem.movie)
      );
      const tmdbResults = await Promise.all(promiseArray);

      // Filter + deduplicate
      const filteredResults = tmdbResults
        .map((resultsArray, index) => {
          const originalMovieTitle = gptMovies[index]?.movie?.toLowerCase();
          const originalLanguage = gptMovies[index]?.lang?.toLowerCase();

          return resultsArray.filter((result) => {
            const titleMatches =
              result?.title?.toLowerCase() === originalMovieTitle;
            const langMatches =
              result?.original_language?.toLowerCase() === originalLanguage;
            const hasImage = result.poster_path;
            return titleMatches && langMatches && hasImage;
          });
        })
        .flat()
        .reduce((acc, movie) => {
          acc[movie.title] = acc[movie.title] || [];
          acc[movie.title].push(movie);
          return acc;
        }, {});

      const limitedResults = Object.values(filteredResults).flatMap((movies) =>
        movies.slice(0, 2)
      );

      dispatch(
        addGPTMovieResult({
          movieNames: gptMovies,
          movieResults: limitedResults,
        })
      );

      dispatch(toggleIsLoading());
    } catch (error) {
      console.error("GPT Search Error:", error);
      dispatch(toggleIsLoading());
    }
  };

  return (
    <div className="z-10 pt-[45%] md:pt-[15%] w-full flex justify-center p-2 md:p-0">
      <div className="grid grid-cols-12 w-full md:w-1/2 bg-black p-4 rounded">
        <input
          ref={searchText}
          className="col-span-9 bg-gray-500 text-white placeholder:text-gray-300 p-2 rounded bg-opacity-45 placeholder:text-sm md:placeholder:text-base"
          type="text"
          placeholder={lang[language].GPTSearchPlaceholder}
        />
        <button
          onClick={handleGPTSearch}
          className="col-span-3 bg-red-600 ml-2 rounded text-white text-sm md:text-base"
        >
          {lang[language].search}
        </button>
      </div>
    </div>
  );
};

export default GPTSearchBar;
