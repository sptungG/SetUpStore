import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import FromGroup from "../../components/form/FromGroup";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";

function RegisterComplete({ history }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  React.useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) throw new Error("Email and password is required");
      if (password.length < 6) throw new Error("Password must be at least 6 characters long");

      const result = await auth.signInWithEmailLink(email, window.location.href);
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        createOrUpdateUser(idTokenResult.token)
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
            throw new Error(err);
          });
        // redirect
        history.replace("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form-title">React Register</h1>
      <FromGroup id="email" label="Email" type="email" value={email} placeholder="Nhập email..." disabled={true} onChange={(e) => setEmail(e.target.value)} />
      <FromGroup id="password" label="Password" type="password" value={password} placeholder="Nhập password..." onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="btn btn-primary">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container">
      <div className="form-container">{completeRegistrationForm()}</div>
    </div>
  );
}
export default RegisterComplete;
