import React from "react";
import { auth } from "../../common/firebase";

import { toast } from "react-toastify";
import { FaUserLock } from "react-icons/fa";

import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
import FormGroup from "../../components/form/FormGroup";
function Setting() {
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form className="form" onSubmit={handleSubmit}>
      <FormGroup
        id="password"
        label="Your Password"
        type="password"
        value={password}
        placeholder="Enter new password..."
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>
        Submit
      </button>
    </form>
  );

  return (
    <div className="container dashboard">
      <div className="dashboard-left">
        <Profile />

        <UserNav />
      </div>
      <div className="dashboard-right">
        <div className="password-container">
          {loading ? (
            <h2 className="text-loader">Loading...</h2>
          ) : (
            <h2 className="form-title">
              <FaUserLock size={28} />
              <span>Password Update</span>
            </h2>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
}

export default Setting;
