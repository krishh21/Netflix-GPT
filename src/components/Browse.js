import React from "react";
import Header from "./Header";
import MovieTrailer from "./MovieTrailer";
import MovieList from "./MovieList";
import useMovies from "../hooks/useMovies";
import {
  MOVIE_API_GENRE,
  MOVIE_API_NOW_PLAYING_MOVIES,
  MOVIE_API_POPULAR_MOVIES,
  MOVIE_API_TOP_RATED_MOVIES,
  MOVIE_API_UPCOMING_MOVIES,
} from "../utils/constants";
import { useSelector } from "react-redux";
import GPT from "./GPT";
import Footer from "./Footer";

const Browse = () => {
  const showGPTSearch = useSelector((store) => store.GPT.showGPTSearch);
  const errorJio = useSelector((store) => store.movies.error);

  useMovies(MOVIE_API_NOW_PLAYING_MOVIES, "Now Playing");
  useMovies(MOVIE_API_POPULAR_MOVIES, "Popular");
  useMovies(MOVIE_API_TOP_RATED_MOVIES, "Top Rated");
  useMovies(MOVIE_API_UPCOMING_MOVIES, "Upcoming");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${28}`, "Action");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${12}`, "Adventure");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${16}`, "Animation");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${80}`, "Crime");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${35}`, "Comedy");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${99}`, "Documentary");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${18}`, "Drama");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${10751}`, "Family");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${14}`, "Fantasy");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${36}`, "History");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${27}`, "Horror");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${10402}`, "Music");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${9648}`, "Mystery");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${10749}`, "Romance");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${878}`, "Science Fiction");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${10770}`, "TV Movies");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${53}`, "Thriller");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${10752}`, "War");
  useMovies(`${MOVIE_API_GENRE}+&with_genres=${37}`, "Western");

  return (
    <div className="min-h-screen">
      <Header />
      {errorJio ? (
        <div className="bg-black flex text-white min-h-screen justify-center items-center p-5 w-full">
          <div className="md:w-1/2 flex flex-col items-center p-2">
            <div className="font-bold text-gray-100 text-3xl pb-3">
              Oops! Something Went Wrong
            </div>
            <p className="font-medium">
              We are unable to fetch the data right now. This could be due to a
              network issue.
              <br /> Don't worry, here are a few things you can try:
            </p>
            <ul className="list-disc">
              <li>
                <span className="text-red-500 pr-1">Refresh</span>the Page
                <p>
                  Sometimes a simple refresh does the trick! Please try
                  refreshing the page once.
                </p>
              </li>
              <li>
                <span className="text-red-500">Check your Network</span>
                <p>
                  If you're using a{" "}
                  <span className="text-red-500 text-lg font-semibold">
                    JIO
                  </span>{" "}
                  connection, our system may have trouble fetching the data from
                  our servers.
                  <br /> Try switching to another network like Wi-Fi or a
                  different mobile data provider.
                </p>
              </li>
            </ul>
          </div>
        </div>
      ) : showGPTSearch ? (
        <GPT />
      ) : (
        <>
          <MovieTrailer />
          <MovieList />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Browse;
