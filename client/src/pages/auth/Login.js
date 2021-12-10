import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

import { auth, googleAuthProvider } from "../../common/firebase";
import FormGroup from "../../components/form/FormGroup";
import { createOrUpdateUser } from "../../functions/auth";

function Login({ history }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  let dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const roleBasedRedirect = (role) => {
    if (role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          // console.log("CREATE OR UPDATE RES", res);
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
          roleBasedRedirect(res.data.role);
        })
        .catch((err) => {
          console.log(err);
        });

      // history.replace("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // console.log("CREATE OR UPDATE RES", res);
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
            roleBasedRedirect(res.data.role);
          })
          .catch((err) => {
            console.log(err);
          });

        // history.replace("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const LoginForm = () => (
    <form className="form" onSubmit={handleSubmit}>
      {loading ? <h1 className="text-loader">Loading...</h1> : <h1 className="form-title">React Login</h1>}
      <FormGroup id="email" label="Email" type="email" value={email} placeholder="Nhập email..." onChange={(e) => setEmail(e.target.value)} />
      <FormGroup id="password" label="Password" type="password" value={password} placeholder="Nhập password..." onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="btn btn-primary" disabled={!email || password.length < 6}>
        <HiOutlineMail size={24} /> Login with Email/Password
      </button>
    </form>
  );

  return (
    <div className="container">
      <div className="form-container">
        {LoginForm()}
        <button type="submit" className="btn btn-google" onClick={googleLogin}>
          <FcGoogle size={24} /> Login with Google
        </button>
        <Link to="/forgot/password" className="text-forgot">
          Forgot Password
        </Link>
      </div>
    </div>
  );
}
export default Login;
