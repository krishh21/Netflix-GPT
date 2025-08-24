import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./store/appStore";
import { useEffect } from "react";
import { handleRedirectResult } from "./utils/auth"; // import your function
import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  useEffect(() => {
    const checkRedirect = async () => {
      const user = await handleRedirectResult();
      if (user) {
        console.log("Redirect login success:", user);
        // you can also dispatch user to redux here if needed
      }
    };

    checkRedirect();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
      } else {
        console.log("User logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
