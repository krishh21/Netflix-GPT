import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHeroMovieTrailerDetails } from "../store/moviesSlice";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // ✅ run hook whenever selectedMovieId changes
  useMovieTrailer(selectedMovieId);

  const handleClick = () => {
    if (!movie?.id) return;
    dispatch(addHeroMovieTrailerDetails(movie));
    setSelectedMovieId(movie.id); // trigger hook
  };

  if (!movie?.poster_path) return null;

  return (
    <div
      className="w-44 cursor-pointer hover:scale-105 transition-transform"
      onClick={handleClick}
    >
      <img
        className="rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p className="text-white text-sm mt-1">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
