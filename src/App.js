import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { Switch, Route } from "react-router-dom";
import Header from "./components/nav/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { withRouter } from "react-router";
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: {
              user: user.email,
              token: idTokenResult.token,
            },
          },
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      {<ToastContainer />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/Complete" component={RegisterComplete} />
        <Route exact path="/forgot/Password" component={ForgotPassword} />
      </Switch>
    </>
  );
};

// export default App;
export default withRouter(App);
