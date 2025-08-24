import React from "react";
import { useSelector } from "react-redux";

const MovieTrailer = () => {
  // get trailer details from redux
  const trailer = useSelector(
    (store) => store.movies.heroMovieTrailer.youtubeKeyDetails
  );

  if (!trailer) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center bg-black text-white">
        <p className="text-lg">Click on a movie to play its trailer 🎬</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[70vh] bg-black">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
        title="YouTube Trailer Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieTrailer;
