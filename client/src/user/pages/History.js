import React from "react";
import { useSelector } from "react-redux";

import Profile from "../Profile";
import UserNav from "../../common/nav/UserNav";
function History() {
  let { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="container profile">
      <div className="profile-left">
        <Profile data={user} />
        <UserNav/>
      </div>
      <div className="profile-right">
        <h1 className="text-demo">User history page</h1>
      </div>
    </div>
  );
}

export default History;
