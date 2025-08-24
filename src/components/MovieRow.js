import React from "react";
import Slider from "react-slick";
import MovieCard from "./MovieCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-0 cursor-pointer z-10 right-0 text-white h-full justify-center items-center flex bg-black bg-opacity-50 w-14 rounded opacity-0 transition-opacity duration-300 group-hover/MovieRow:opacity-100"
      onClick={onClick}
    >
      <ChevronRightIcon fontSize="large" />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute cursor-pointer z-10 left-0 md:-left-10 text-white h-full justify-center items-center flex bg-black bg-opacity-50 rounded opacity-0 transition-opacity duration-300 group-hover/MovieRow:opacity-100"
      onClick={onClick}
    >
      <ChevronLeftIcon fontSize="large" />
    </div>
  );
};

const MovieRow = ({ title, movies }) => {
  // Slider settings for slick carousel
  const settings = {
    dots: false, // Show dots for navigation
    infinite: true, // Loop through movies infinitely
    speed: 500, // Transition speed
    slidesToShow: 6, // Number of movies shown at once
    slidesToScroll: 1, // Number of movies scrolled at once
    centerPadding: "0px",
    initialSlide: 0,
    arrows: true, // Enable arrows
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom previous arrow
    responsive: [
      // Responsive behavior
      {
        breakpoint: 1024, // Adjust for tablets and smaller screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768, // Adjust for mobile screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Adjust for very small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-2 md:pl-12 pl-5">
      <h1 className="text-white font-bold text-2xl opacity-95 mb-4">{title}</h1>
      <div className="group/MovieRow relative">
        <Slider {...settings}>
          {movies?.map((movie) => (
            <div key={movie.id} className="pl-[12%] md:pl-0">
              <MovieCard movie={movie} imageType="backdrop" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieRow;
