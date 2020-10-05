import React, { useState } from "react";
import "./Register.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { auth } from "./../../firebase";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthAction } from "./../../actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

function Login() {
  const dispatch = useDispatch();
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
        console.log("Login Succesfully!");
        dispatch(getUserAuthAction(authUser));
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

          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            type="submit"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <p>
            u dont have an Account?
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "white",
                fontWeight: "400",
                fontSize: "1.1rem",
                marginLeft: "0.5rem",
              }}
              to="/register"
            >
              Create Here!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
