import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import AvatarImg from "../../assets/images/smile.jpeg";
import Avatar from "@mui/material/Avatar";
import "./style.css";
import { logout } from "../../firebase";
import MenuIcon from "@mui/icons-material/Menu";
//
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import * as codeAction from '../../store/actions/codeActions';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };
  const dispatch = useDispatch();
  const user = getAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const display = {
    display: "block",
  };
  const none = {
    display: "none",
  };
  const onClickLogOut = () => {
    dispatch(codeAction.getCodeConfirm(''));
    logout();
    return navigate("/login");
  };
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="offcanvas-wrapper"
    >
      <div className="offcanvas-logo">
        <Link to="/" onClick={toggleDrawer(false)}>
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <Divider />
      <div className="offcanvas-menu">
        <ul className="menu-warrap-offcanvas">
          <li className="menu-child">
            <NavLink to="/" onClick={toggleDrawer(false)}>
              Home
            </NavLink>
          </li>
          <li className="menu-child">
            <NavLink to="/categories" onClick={toggleDrawer(false)}>
              Categories
            </NavLink>
          </li>
          <li className="menu-child">
            <NavLink to="/new-diary" onClick={toggleDrawer(false)}>
              New Diary
            </NavLink>
          </li>
          <li className="menu-child">
            <NavLink to="/gallery" onClick={toggleDrawer(false)}>
              Gallery
            </NavLink>
          </li>
        </ul>
      </div>
    </Box>
  );

  return (
    <header className="header-section">
      <div className="container">
        <div className="content-header flex-box">
          <div className="site-logo site-logo-desktop">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="site-offcanvas">
            <MenuIcon onClick={toggleDrawer(true)} />
          </div>
          <div className="site-logo site-logo-mobile">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="site-menu">
            <ul className="menu-warrap">
              <li className="menu-child">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="menu-child">
                <NavLink to="/categories">Categories</NavLink>
              </li>
              <li className="menu-child">
                <NavLink to="/new-diary">New Diary</NavLink>
              </li>
              <li className="menu-child">
                <NavLink to="/gallery">Gallery</NavLink>
              </li>
            </ul>
          </div>
          <div className="site-user">
            <Avatar
              alt="Nhunnnn"
              src={user ? user?.currentUser?.photoURL : AvatarImg}
              sx={{ width: 45, height: 45 }}
              className="user-avatar"
              onClick={handleClick}
            />
            <div className="user-details" style={open ? display : none}>
              <div className="wrapper">
                <Link to="/profile" onClick={handleClose}>
                  Nhunnn's Profile
                </Link>
                <span onClick={onClickLogOut}>Log Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="blur"
        style={open ? display : none}
        onClick={handleClose}
      ></div>
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)} className="offcanvas-parent">
        {list("left")}
      </Drawer>
    </header>
  );
}
