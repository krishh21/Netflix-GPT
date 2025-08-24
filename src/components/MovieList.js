import React from "react";
import MovieRow from "./MovieRow";
import { useSelector } from "react-redux";

const MovieList = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black pb-6">
      {/* 
      Movielist - Popular
        - Movie Cards
      Movielist - NowPlaying 
      Movielist - Trending
      Movielist - Genres like horror 
    */}
      <div className="-mt-[18%]">
        <MovieRow title="Upcoming" movies={movies?.Upcoming} />
        <MovieRow title="Top Rated" movies={movies?.["Top Rated"]} />
        <MovieRow title="Now Playing" movies={movies?.["Now Playing"]} />
        <MovieRow title="Adventure" movies={movies?.Adventure} />
        <MovieRow title="Fantasy" movies={movies?.Fantasy} />
        <MovieRow title="Animation" movies={movies?.Animation} />
        <MovieRow title="Comedy" movies={movies?.Comedy} />
        <MovieRow title="Action" movies={movies?.Action} />
        <MovieRow title="Mystery" movies={movies?.Mystery} />
        <MovieRow title="Drama" movies={movies?.Drama} />
        <MovieRow title="Family" movies={movies?.Family} />
        <MovieRow title="History" movies={movies?.History} />
        <MovieRow title="Horror" movies={movies?.Horror} />
        <MovieRow title="Crime" movies={movies?.Crime} />
        <MovieRow title="Music" movies={movies?.Music} />
        <MovieRow title="War" movies={movies?.War} />
        <MovieRow title="Documentary" movies={movies?.Documentary} />
        <MovieRow title="Popular" movies={movies?.Popular} />
        <MovieRow title="Western" movies={movies?.Western} />
        <MovieRow title="Romance" movies={movies?.Romance} />
        <MovieRow
          title="Science Fiction"
          movies={movies?.["Science Fiction"]}
        />
        <MovieRow title="TV Movies" movies={movies?.["TV Movies"]} />
      </div>
    </div>
  );
};

export default MovieList;
