import React, { useState } from "react";
import "./Register.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Backdrop, Button, CircularProgress } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { auth } from "./../../firebase";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Swal from "sweetalert2";
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
function Register() {
  const classes = useStyles();
  const history = useHistory();
  const[open, setOpen] = useState(false);

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

    if(name.trim() === '' || confirm.trim() === ''){

      return Swal.fire({
        icon: 'error',
        title: 'Register Fail',
        position: 'top',
        text: 'All the fields are required!',
        confirmButtonColor: 'rgb(37, 37, 37)'
        // footer: '<a href>Why do I have this issue?</a>'
      })
    }
    if(confirm.length < 6 ){

      return   Swal.fire({
        icon: 'error',
        title: 'Register Fail',
        position: 'top',
        text: 'the password need to be at least 6 characteres',
        confirmButtonColor: 'rgb(37, 37, 37)'
        // footer: '<a href>Why do I have this issue?</a>'
      })
    }
    if(confirm !== password){

      return   Swal.fire({
        icon: 'error',
        title: 'Register Fail',
        position: 'top',
        text: 'the passwords do not match',
        confirmButtonColor: 'rgb(37, 37, 37)'
        // footer: '<a href>Why do I have this issue?</a>'
      })
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
        });
        setOpen(!open);
        setTimeout(()=>{
          setOpen(false)
          history.push("/tasks");
        }, 1000)  
       
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Register Fail',
          position: 'top',
          text: `${error.message}`,
          confirmButtonColor: 'rgb(37, 37, 37)'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      });
  };

  const handleClose = () => {
    setOpen(false);
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
          <button
            className="button__login"
            type="submit"
            onClick={handleSubmit}
          >
            <LabelImportantIcon />
            <p>Create an Account</p>
          </button>
          <div className="login__createaccount">
            <p>Back to login?</p>
            <Link
              to="/"
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
              <p> Click Here!</p>
              <ArrowBackIcon />
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

export default Register;
