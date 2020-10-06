import React, { useEffect, useState } from "react";
import "./Header.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "./../../firebase";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAuthAction } from "./../../actions/userActions";
import { deleteProjectAction } from "./../../actions/projectsActions";

//esto es para los avatar de material UI

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.users.userAuth);
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
  return (
    <div className="header">
      <div className="header__title">
        <div className={classes.root}>
          <Avatar alt={username?.displayName} src="" />
        </div>
        <h2 className="header__username">{usernameauth}</h2>
      </div>
      <div className="header__button">
        <button className="CerrarSesion" onClick={handleClick}>
          <ExitToAppIcon />
          <p>LogOut</p>
        </button>
      </div>
    </div>
  );
}

export default Header;
