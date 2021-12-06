import React from "react";
import { FaUserTag, FaHeart } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";

function Profile({ data }) {
  return (
    <div className="profile-info">
      <div className="profile-image">
        <div className="profile-wallpaper">
          <img src="https://source.unsplash.com/random/?vietnam,nature" alt="wallpaper" />
        </div>
        <div className="profile-avt">
          <img src={data.picture} alt="avatar" />
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-name">{data.name}</div>
        <div className="profile-email">{data.email}</div>
        <div className="profile-role">
          <FaUserTag />
          <span>{data.role}</span>
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
