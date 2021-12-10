import React from "react";
import { useSelector } from "react-redux";

import { FaUserTag, FaHeart } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";

function Profile() {
  let { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="profile-info">
      <div className="profile-image">
        <div className="profile-wallpaper">
          <img src="https://source.unsplash.com/random/?vietnam,nature" alt="wallpaper" />
        </div>
        <div className="profile-avt">
          <img src={user.picture} alt="avatar" />
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-name">{user.name}</div>
        <div className="profile-email">{user.email+"aaaaaaaaaaaa"}</div>
        <div className="profile-role">
          <FaUserTag />
          <span>{user.role}</span>
        </div>
        <ul className="total-list">
          <li className="total-item">
            <FaHeart />
            <span className="total-num">{100}</span>
          </li>
          <li className="total-item">
            <RiHistoryFill />
            <span className="total-num">{100}</span>
          </li>
          <li className="total-item">
            <AiFillStar />
            <span className="total-num">{100}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
