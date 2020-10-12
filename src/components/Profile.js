import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./Profile.css";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./../firebase";
import { storage } from "./../firebase";
import { setImageUrlAction } from "./../actions/userActions";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Profile({ imagenProfile }) {
  const classes = useStyles();
  const [userauthenticated, setUserAuth] = useState();
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.users.userAuth);
  const imageProfile = useSelector((state) => state.users.imageProfile);
  const [imagenperfil, setImagenPerfil] = useState(null);
  const [imageerror, setImageError] = useState(false);

  useEffect(() => {
    if (userAuth) {
      setUserAuth({
        name: userAuth.displayName,
        email: userAuth.email,
        photoRuta: userAuth.photoURL,
      });
    }
  }, [userAuth]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClickUpdate = (e) => {
    e.preventDefault();
    // the fancy code to update de url image
    if (!photo) {
      return setImageError(true);
    }
    storage
      .ref("users/" + userAuth?.uid + "/profile.jpg")
      .put(photo)
      .then(function () {
        console.log("upload succesfully!");
        storage
          .ref("users/" + userAuth?.uid + "/profile.jpg")
          .getDownloadURL()
          .then((imageUrl) => {
            dispatch(setImageUrlAction(imageUrl));
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
    setPhoto(null);
  };

  return (
    <>
      <div className="profile">
        <div className="profile__title">
          <div className={classes.root}>
            <Avatar
              style={{ width: "5rem", height: "5rem", marginBottom: "0.8rem" }}
              alt=""
              src={imageProfile}
            />
          </div>
          <h2>Personal Information</h2>
        </div>
        {imageerror ? (
          <div className="profile__errorupload">
            <Alert
              style={{ width: "14rem", marginBottom: "1rem" }}
              severity="error"
            >
              Ups, You must first upload an image
            </Alert>
          </div>
        ) : null}

        <div className="profile__container">
          <div className="profile__profiletitle">
            <h3>Profile</h3>
            <p>
              It is possible that other users can see some of the information
            </p>
          </div>
          <div className="profile__info">
            <label>Photo</label>
            <input
              className="profile__file"
              type="file"
              name="picture"
              onChange={handleChange}
            />
            <ChevronRightIcon />
          </div>
          <div className="profile__info">
            <label>Username</label>
            <input
              className="profile__input"
              type="text"
              name="username"
              value={userauthenticated?.name}
              disabled
            />
            <ChevronRightIcon />
          </div>
          <div className="profile__info">
            <label>Password</label>
            <input
              className="profile__input"
              type="text"
              name="password"
              value="**********"
              disabled
            />
            <ChevronRightIcon />
          </div>
        </div>
      </div>
      <div className="profile">
        <form>
          <div className="profile__title">
            <h2>Contact Informationn</h2>
          </div>

          <div className="profile__container2">
            <div className="profile__containerinfo2">
              <div className="profile__info">
                <label>Email</label>
                <input
                  className="profile__input"
                  type="text"
                  name="email"
                  value={userauthenticated?.email}
                  disabled
                />
              </div>
              {/* <div className="profile__info">
                <label>Fono</label>
                <input className="profile__input" type="number" name="phono" />
              </div> */}
            </div>
            <img src="https://www.gstatic.com/identity/boq/accountsettingsmobile/aboutme_scene_316x112_371ea487b68d0298cc54522403223de1.png" />
          </div>
          <div className="profile__containerbutton">
            <button type="submit" onClick={handleClickUpdate} disabled={!photo}>
              Update photo
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
