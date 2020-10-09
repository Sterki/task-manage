import React, { useState } from "react";
import "./Register.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { auth } from "./../../firebase";
import { Link, useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [userinfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userinfo,
      [e.target.name]: e.target.value,
    });
  };
  const { password, email } = userinfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    // here goes the fancy code to do a sign in with firebase auth
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        history.push("/tasks");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="register">
      <div className="register__form">
        <h2>Sign In</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            style={{
              marginTop: "1rem",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            type="text"
            value={email}
            onChange={handleChange}
          />
          <TextField
            style={{
              marginTop: "1rem",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <button
            className="button__login"
            type="submit"
            onClick={handleSubmit}
          >
            <LabelImportantIcon />
            <p>Sign In</p>
          </button>
          <div className="login__createaccount">
            <p>don't have an account?</p>
            <Link
              to="/register"
              className="login__linkacc"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "white",
                fontWeight: "400",
                fontSize: "1.1rem",
                marginLeft: "0.5rem",
              }}
            >
              <p> Create Here!</p>
              <AddCircleOutlineIcon />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
