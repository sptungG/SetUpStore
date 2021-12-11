import React from 'react'
import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
function CategoryUpdate() {
  return (
    <div className="container dashboard">
      <div className="dashboard-left">
        <Profile />
        <UserNav />
      </div>
      <div className="dashboard-right">
        <h1 className="text-demo">User CategoryUpdate page</h1>
      </div>
    </div>
  )
}

export default CategoryUpdate
