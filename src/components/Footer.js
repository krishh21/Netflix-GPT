import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm">
      <div className="mb-2 md:mb-0">
        <p>
          &copy; {new Date().getFullYear()} Krishna Yadav. All rights reserved.
        </p>
      </div>
      <div className="flex space-x-4">
        <a
          href="mailto:krishna1052004@gmail.com"
          className="hover:text-gray-400 transition-colors duration-200"
        >
          📧 Email
        </a>
        <a
          href="https://www.linkedin.com/in/krishna-yadav-27aa8026a"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition-colors duration-200"
        >
          💼 LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;