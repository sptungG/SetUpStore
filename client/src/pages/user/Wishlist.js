import React from "react";

import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
function Wishlist() {
  return (
    <div className="container profile">
      <div className="profile-left">
        <Profile />
        <UserNav/>
      </div>
      <div className="profile-right">
        <h1 className="text-demo">User Wishlist page</h1>
      </div>
    </div>
  );
}

export default Wishlist;