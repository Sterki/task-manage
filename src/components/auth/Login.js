import React, { useState } from "react";
import "./Register.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Backdrop, Button, CircularProgress } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { auth } from "./../../firebase";
import { Link, useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Swal from "sweetalert2";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },   
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const[open, setOpen] = useState(false);
  const [errormessage, setError] = useState('');

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
        setOpen(!open);
        setTimeout(()=>{
          setOpen(false)
          history.push("/tasks");
        }, 1000)  
      })
      .catch((error) => {

        setError(error.message)
        // Swal.fire({          
        //   position: 'top',
        //   width: '20rem',
        //   heightAuto: 'false',         
        //   title: 'Login failed',
        //   text: `${error.message}`,
        //   confirmButtonColor: 'rgb(37, 37, 37)'
        //   // footer: '<a href>Why do I have this issue?</a>'
        // })
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="register">
      <div className="register__form">
        <h2>Sign In</h2>
        {errormessage ? <div className={classes.root}>
          <Alert severity="error">
        <AlertTitle>Login Error</AlertTitle>
        {errormessage} — <strong>check it out!</strong>
          </Alert>      
    </div> : null}
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
          <div>
          <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
              <CircularProgress color="inherit" /> <p>Redirecting...</p>
            </Backdrop>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
