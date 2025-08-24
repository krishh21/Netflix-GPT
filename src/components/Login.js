import React, { useRef, useState } from "react";
import { BG_IMAGE } from "../utils/constants";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import {
  doSignInWithEmailAndPassword,
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
  doProfileUpdate,
} from "../utils/authenticate";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser } from "../store/userSlice";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col gap-1">
      {message.map((err, i) => {
        return (
          <p
            key={i}
            className="text-xs md:text-sm flex justify-start items-center text-red-500 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <span>{err}</span>
          </p>
        );
      })}
    </div>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const toggleSignin = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = async () => {
    // check Validation
    const error = checkValidation(
      email?.current.value,
      password?.current.value
    );

    let errors = {
      email: error.emailCheck,
      password: error.passwordCheck,
    };

    if (!isSignIn) {
      if (password?.current.value !== confirmPassword?.current.value) {
        errors.confirmPassword = "Passwords don't match";
      }
    }
    // If any error exists, update errorMessage and stop submission
    if (
      errors.email !== null ||
      errors.password.length !== 0 ||
      errors.confirmPassword
    ) {
      setErrorMessage(errors);
      return console.log("Some error occured"); // Exit if there are validation errors
    }

    setErrorMessage(null); // Clear any previous error messages

    // Proceed with authentication if no errors
    if (!signingIn) {
      setSigningIn(true);
      try {
        if (!isSignIn) {
          await doCreateUserWithEmailAndPassword(
            email?.current.value,
            password?.current.value
          );
          await doProfileUpdate(name.current.value);
          const {
            uid,
            email: emailid,
            displayName,
            photoURL,
          } = auth?.currentUser;
          dispatch(
            addUser({
              uid: uid,
              email: emailid,
              displayName: displayName,
              photoURL: photoURL,
            })
          );
        } else {
          await doSignInWithEmailAndPassword(
            email?.current.value,
            password?.current.value
          );
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage({
          ...errorMessage,
          auth: error.message,
        });
        setSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!signingIn) {
      setSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (err) {
        setSigningIn(false);
      }
    }
  };

  return (
    <div
      className="md:min-h-screen relative flex flex-col justify-between"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      <div className="relative flex flex-col md:min-h-screen w-full z-10 bg-black md:bg-transparent">
        <Header />
        <div className="pt-[35%] md:pt-0 flex w-full h-full min-h-screen justify-start md:justify-center items-start md:items-center px-7">
          <div
            id="form"
            className="text-white flex flex-col lg:w-1/3 w-full bg-black bg-opacity-75 md:p-14 rounded-md"
          >
            <h1 className="text-4xl font-bold mb-5">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignIn && (
              <input
                ref={name}
                type="text"
                placeholder="Name*"
                className="p-4 my-2 bg-transparent outline-none border border-stone-400 rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email*"
              className={`p-4 my-2 bg-transparent outline-none border ${
                errorMessage?.email ? "border-red-500" : "border-stone-400"
              } rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium`}
            />
            {errorMessage?.email && (
              <ErrorMessage message={[errorMessage?.email]} />
            )}
            <input
              ref={password}
              type="password"
              placeholder="Password*"
              className={`p-4 my-2 bg-transparent outline-none border ${
                Array.isArray(errorMessage?.password) &&
                errorMessage?.password.length === 0
                  ? "border-stone-400"
                  : errorMessage?.password
                  ? "border-red-500"
                  : "border-stone-400"
              } rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium`}
            />
            {errorMessage?.password && (
              <ErrorMessage message={errorMessage?.password} />
            )}
            {!isSignIn && (
              <input
                ref={confirmPassword}
                type="password"
                placeholder="Confirm Password*"
                className={`p-4 my-2 bg-transparent outline-none border ${
                  errorMessage?.password && errorMessage?.confirmPassword
                    ? "border-red-500"
                    : "border-stone-400"
                } rounded-md placeholder:text-stone-400 placeholder:text-lg placeholder:font-medium`}
              />
            )}
            {errorMessage?.password && errorMessage?.confirmPassword && (
              <ErrorMessage message={[errorMessage?.confirmPassword]} />
            )}
            {errorMessage?.auth && (
              <ErrorMessage message={[errorMessage?.auth]} />
            )}
            <button
              disabled={signingIn}
              onClick={handleSubmit}
              className={`p-2 my-2 bg-red-600 font-semibold text-lg rounded-md hover:bg-red-700 ${
                signingIn
                  ? "cursor-not-allowed bg-red-800"
                  : "transition duration-300 active:scale-95"
              }`}
            >
              {isSignIn && !signingIn
                ? "Sign In"
                : isSignIn && signingIn
                ? "Signing In..."
                : !isSignIn && !signingIn
                ? "Sign Up"
                : "Sigining Up..."}
            </button>
            <p className="my-2 text-gray-300 font-medium text-lg">
              {isSignIn ? "New to Netflix? " : "Already a user? "}
              <span
                className="font-bold text-white hover:underline cursor-pointer"
                onClick={toggleSignin}
              >
                {isSignIn ? "Sign up now" : "Sign in"}
              </span>
            </p>
            <div className="flex flex-row text-center w-full">
              <div className="border-b-2 mb-2.5 mr-2 w-full"></div>
              <div className="text-sm font-bold w-fit primary-dark-text">
                OR
              </div>
              <div className="border-b-2 mb-2.5 ml-2 w-full"></div>
            </div>
            <button
              disabled={signingIn}
              onClick={(e) => {
                onGoogleSignIn(e);
              }}
              className={`mt-4 w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-md text-sm font-medium  ${
                signingIn
                  ? "cursor-not-allowed"
                  : "transition duration-300 active:scale-95"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {signingIn ? "Signing In..." : "Continue with Google"}
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-45 min-h-screen h-full"></div>
    </div>
  );
};

export default Login;
