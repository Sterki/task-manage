import React, { useState } from "react";
import "./Register.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { auth } from "./../../firebase";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

function Register() {
  const classes = useStyles();
  const history = useHistory();

  const [userinfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userinfo,
      [e.target.name]: e.target.value,
    });
  };
  const { name, password, email, confirm } = userinfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    // here the fancy code to allow us create a new user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
        });
        history.push("/tasks");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="register">
      <div className="register__form">
        <h2>Create an Account</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            style={{
              marginTop: "1rem",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
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
          <TextField
            style={{
              marginTop: "1rem",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            name="confirm"
            type="password"
            value={confirm}
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
            Create an Account
          </Button>
          <p>
            Back to login?
            <Link
              to="/"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "white",
                fontWeight: "400",
                fontSize: "1.1rem",
                marginLeft: "0.5rem",
              }}
            >
              Click Here!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
