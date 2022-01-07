import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./common/firebase";
import { currentUser } from "./functions/auth";
import Loader from "./components/loader/Loader";
import "./App.less";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const Setting = lazy(() => import("./pages/user/Setting"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryPage = lazy(() => import("./pages/admin/category/CategoryPage"));
const SubPage = lazy(() => import("./pages/admin/sub/SubPage"));
const CouponPage = lazy(() => import("./pages/admin/coupon/CouponPage"));
const ProductPage = lazy(() => import("./pages/admin/product/ProductPage"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));

const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));

const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/nav/SideDrawer"));
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Store = lazy(() => import("./pages/Store"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));

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
                area: res.data.area,
                address: res.data.address,
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
    <Suspense fallback={<Loader />}>
      <Header />
      <SideDrawer />
      <ToastContainer theme="light" />
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
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={ProductPage} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/coupon" component={CouponPage} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
    </Suspense>
  );
}

export default App;
