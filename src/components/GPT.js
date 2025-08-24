import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { BG_IMAGE } from "../utils/constants";

const GPT = () => {
  return (
    <>
      <div className="min-h-screen relative flex flex-col">
        <div className="fixed inset-0 -z-20">
          <img
            className="object-cover min-h-screen"
            src={BG_IMAGE}
            alt="banner"
          />
        </div>
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
      <div className="fixed inset-0 bg-black opacity-45 min-h-screen h-full z-0"></div>
    </>
  );
};

export default GPT;
