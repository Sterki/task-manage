import React from "react";
import "./Header.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "./../../firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUserAuthAction } from "./../../actions/userActions";

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    auth.signOut();
    dispatch(deleteUserAuthAction());
    history.push("/");
  };
  return (
    <div className="header">
      <div className="header__title">
        <h1>Hello: Alex Rodriguez</h1>
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
