import React from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./Profile.css";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Profile() {
  const classes = useStyles();
  return (
    <>
      <div className="profile">
        <div className="profile__title">
          <div className={classes.root}>
            <Avatar
              style={{ width: "5rem", height: "5rem", marginBottom: "0.8rem" }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </div>
          <h2>Personal Information</h2>
          <p>
            Basic information, such as name and photo, that you use in Task
            Manage
          </p>
        </div>

        <div className="profile__container">
          <div className="profile__profiletitle">
            <h3>Profile</h3>
            <p>
              It is possible that other users can see some of the information
            </p>
          </div>
          <div className="profile__info">
            <label>Foto</label>
            <input className="profile__file" type="file" name="picture" />
            <ChevronRightIcon />
          </div>
          <div className="profile__info">
            <label>Username</label>
            <input className="profile__input" type="text" name="username" />
            <ChevronRightIcon />
          </div>
          <div className="profile__info">
            <label>Date of birth</label>
            <input className="profile__input" type="text" name="birthday" />
            <ChevronRightIcon />
          </div>
          <div className="profile__info">
            <label>Gender</label>
            <input className="profile__input" type="text" name="gender" />
            <ChevronRightIcon />
          </div>
          <div className="profile__info">
            <label>Password</label>
            <input
              className="profile__input"
              type="text"
              name="password"
              disabled
            />
            <ChevronRightIcon />
          </div>
        </div>
      </div>
      <div className="profile">
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
                disabled
              />
            </div>
            <div className="profile__info">
              <label>Fono</label>
              <input className="profile__input" type="text" name="name" />
            </div>
          </div>
          <img src="https://www.gstatic.com/identity/boq/accountsettingsmobile/aboutme_scene_316x112_371ea487b68d0298cc54522403223de1.png" />
        </div>
      </div>
    </>
  );
}

export default Profile;
