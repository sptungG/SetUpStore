import React from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import FromGroup from "../../components/form/FromGroup";

function ForgotPassword({ history }){
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          {loading ? <h1 className="text-loader">Loading</h1> : <h1 className="form-title">Forgot Password</h1>}
          <FromGroup
            id="email"
            label="Email"
            type="email"
            value={email}
            placeholder="Nhập email..."
            autoFocus={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={!email}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
