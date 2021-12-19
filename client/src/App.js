import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./common/firebase";
import "./App.less";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Setting from "./pages/user/Setting";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryPage from "./pages/admin/category/CategoryPage";
import SubPage from "./pages/admin/sub/SubPage";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import Header from "./components/nav/Header";
import Home from "./pages/Home";
import { currentUser } from "./functions/auth";

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
      <ToastContainer theme="light" />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/setting" component={Setting} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryPage} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryPage} />
        <AdminRoute exact path="/admin/sub" component={SubPage} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
