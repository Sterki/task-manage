import React, { useEffect, useState } from "react";
import "./Header.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "./../../firebase";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAuthAction } from "./../../actions/userActions";
import { deleteProjectAction } from "./../../actions/projectsActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ChatIcon from "@material-ui/icons/Chat";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

//esto es para los avatar de material UI

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      color: "white",
      cursor: "pointer",
    },
  },
}));

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.users.userAuth);
  const imageProfile = useSelector((state) => state.users.imageProfile);
  const [usernameauth, setUsername] = useState("");
  const classes = useStyles();

  useEffect(() => {
    setUsername(username?.displayName);
  }, [username]);

  const handleClick = () => {
    auth.signOut();
    dispatch(deleteUserAuthAction());
    dispatch(deleteProjectAction());
    history.push("/");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickbutton = (event) => {
    // let visible = document.getElementById("header_icon");

    setAnchorEl(event.currentTarget);

    // if (visible.style.visibility === "visible") {
    //   visible.style.visibility = "hidden";
    // } else {
    //   visible.style.visibility = "visible";
    // }
  };

  const handleClose = () => {
    setAnchorEl(null);
    // let visible = document.getElementById("header_icon");

    // if (visible.style.visibility === "visible") {
    //   visible.style.visibility = "hidden";
    // }
  };
  return (
    <div className="header">
      <div className="header__title">
        <div className={classes.root}>
          {/* <Badge badgeContent={4} color="primary">
            <NotificationsIcon />
          </Badge> */}
        </div>
        <h2 className="header__username">{usernameauth}</h2>
        <div className={classes.root}>
          <Avatar
            alt={username?.displayName}
            style={{ cursor: "pointer" }}
            src={imageProfile}
            onClick={handleClickbutton}
          />
        </div>
        {/* <div
          className="header__iconarrow"
          id="header_icon"
          onClose={handleClose}
        >
          <ArrowDropUpIcon style={{ width: "7rem", height: "6rem" }} />
        </div> */}
      </div>

      {/* <div className="header__button">
        <button className="CerrarSesion">
          <p>LogOut</p>
        </button>
      </div> */}
      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ marginTop: "3.5rem" }}
        >
          <MenuItem className="header__menuitems">
            {" "}
            <AccountBoxIcon />
            <Link
              className="header__link"
              to="/profile"
              style={{ textDecoration: "none" }}
            >
              <p>My Profile</p>
            </Link>
          </MenuItem>
          <MenuItem className="header__menuitems">
            {" "}
            <AccountTreeIcon />
            <Link
              className="header__link"
              to="/projects"
              style={{ textDecoration: "none" }}
            >
              <p>Projects List</p>
            </Link>
          </MenuItem>
          {/* <MenuItem className="header__menuitems">
            {" "}
            <ChatIcon />
            <Link
              className="header__link"
              to="/profile"
              style={{ textDecoration: "none" }}
            >
              <p>Chat</p>
            </Link>
          </MenuItem> */}
          <MenuItem className="header__menuitems" onClick={handleClick}>
            {" "}
            <ExitToAppIcon />
            <Link
              className="header__link"
              to="/profile"
              style={{ textDecoration: "none" }}
            >
              <p>Logout</p>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
