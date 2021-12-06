import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./common/firebase";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import RegisterComplete from "./auth/pages/RegisterComplete";
import ForgotPassword from "./auth/pages/ForgotPassword";
import History from "./user/pages/History";
import Password from "./user/pages/Password";
import Wishlist from "./user/pages/Wishlist";
import AdminDashboard from "./admin/pages/AdminDashboard";

import UserRoute from "./common/routes/UserRoute";
import AdminRoute from "./common/routes/AdminRoute";

import Header from "./common/nav/Header";
import Home from "./common/Home";
import { currentUser } from "./auth/auth.function";

function App() {
  const dispatch = useDispatch();
  // to check firebase auth state
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                picture: res.data.picture,
                role: res.data.role,
                token: idTokenResult.token,
              },
            });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer theme="dark" />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
