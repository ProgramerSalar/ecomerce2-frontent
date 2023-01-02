import React from "react";
import UserNav from "../../components/nav/UserNav";

const User = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col">
        <div className="colmd-2">
          <UserNav />
        </div>
        <p> user history</p>
      </div>
    </div>
  </div>
);

export default User;
