import React from "react";
import "./style.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import BgCover from "../../assets/images/bg-cover.jpeg";
import Happy2 from "../../assets/images/smile.jpeg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({ codeDefault }) => {
  const [user] = useAuthState(auth);
  return (
    <div className="site-content site-content-profile">
      <div className="container">
        {!codeDefault && (
          <h3 className="not-enter-code">
            You have not entered the verification code{" "}
            <Link to="/">Go back home</Link>
          </h3>
        )}
        {codeDefault && (
          <div className="user-profile flex-box">
            <div className="user-profile-bg-cover">
              <img src={BgCover} alt="bg-cover" />
            </div>
            <img
              className="user-profile-avatar"
              src={user ? user?.photoURL : Happy2}
              alt="avatar"
            />
            <div className="user-profile-info">
              <h3>Name: {user.displayName}</h3>
              <h3>Email: {user.email}</h3>
              <h3>Last Login: {user.metadata.lastSignInTime}</h3>
              <h3>Info: Là một là riêng là duy nhất.</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    codeDefault: state.codeReducer.codeConfirm,
  };
};

export default connect(mapStateToProps)(Profile);
