import React from "react";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";
import FromGroup from "../../components/form/FromGroup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineMail } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

function Login({ history }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  let dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.replace("/");
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
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const LoginForm = () => (
    <form className="form" onSubmit={handleSubmit}>
      {loading ? <h1 className="text-loader">Loading...</h1> : <h1 className="form-title">React Login</h1>}
      <FromGroup id="email" label="Email" type="email" value={email} placeholder="Nhập email..." autoFocus={true} onChange={(e) => setEmail(e.target.value)} />
      <FromGroup id="password" label="Password" type="password" value={password} placeholder="Nhập password..." onChange={(e) => setPassword(e.target.value)} />
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
