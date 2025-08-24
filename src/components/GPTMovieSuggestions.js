import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="flex flex-col w-64 h-96 p-4 animate-pulse bg-gray-300 rounded-md"
          >
            {/* Shimmer for heading */}
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>

            {/* Shimmer for the image */}
            <div className="flex-1 bg-gray-200 rounded"></div>
          </div>
        ))}
    </div>
  );
};

const GPTMovieSuggestions = () => {
  const { movieResults, userSearching, isLoading } = useSelector(
    (store) => store.GPT
  );

  return (
    <div className="z-10 flex flex-1 p-4 m-4">
      <div className="p-4 flex flex-wrap w-full justify-center">
        {!userSearching ? (
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-2xl">
              In order to get the movie results follow the{" "}
              <span className="text-red-500">below</span> steps:
            </h1>
            <ul className="list-disc text-white font-medium">
              <li>
                <span className="text-red-500 pr-1">Enter a Movie Query:</span>
                Type a movie-related prompt in the search bar (e.g., "Funny
                retro hindi movies").
              </li>
              <li>
                <span className="text-red-500 pr-1">Press Enter:</span> Hit
                Enter to submit your query and view matching movie results.
              </li>
              <li>
                <span className="text-red-500 pr-1">Explore Results:</span>{" "}
                Browse the displayed movies and refine your search if needed.
              </li>
            </ul>
          </div>
        ) : isLoading ? (
          // <div class="flex justify-center items-center">
          //   <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          // </div>
          <Shimmer />
        ) : (
          movieResults?.map((movie) => {
            return (
              <div
                key={movie.id}
                className="text-white flex flex-col px-1 max-w-64"
              >
                <h1 className="font-semibold text-2xl py-2 truncate">
                  {movie.title}
                </h1>
                <MovieCard movie={movie} imageType="poster" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
