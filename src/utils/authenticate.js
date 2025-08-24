import { USER_AVATAR } from "./constants";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
} from "firebase/auth";

// Email Sign-Up
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Email Sign-In
export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign Out
export const doSignout = async () => {
  return signOut(auth);
};

// Profile Update
export const doProfileUpdate = async (user) => {
  return updateProfile(auth.currentUser, {
    displayName: user,
    photoURL: USER_AVATAR,
  });
};

// Google Sign-In (Adaptive: Popup for localhost, Redirect for production)
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  if (window.location.hostname === "localhost") {
    // ✅ Local development
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } else {
    // ✅ Production (Firebase Hosting / Vercel / Netlify)
    await signInWithRedirect(auth, provider);
    return null;
  }
};

// Handle Redirect Result (to be used in useEffect after app loads)
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      return result.user;
    }
    return null;
  } catch (error) {
    console.error("Google Redirect Error:", error.message);
    return null;
  }
};
