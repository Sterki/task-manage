import React, { useState } from "react";
import "./Sidebar.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
      width: "25ch",
    },
  },
}));
const useStylesSidebar = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
});
function SideBar() {
  const classes = useStyles();
  const classesSide = useStylesSidebar();
  const [state, setState] = useState({
    left: false,
  });
  function visibleInput() {
    let inputInfo = document.getElementById("inputProject");
    if (inputInfo.style.visibility === "visible") {
      inputInfo.style.visibility = "hidden";
    } else {
      inputInfo.style.visibility = "visible";
    }
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classesSide.list, {
        [classesSide.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
    >
      <List>
        <div className="sidebar">
          <div className="sidebar__title">
            <h2>
              <strong>Mern</strong>
              <p>Task</p>
            </h2>
          </div>
          <div className="sidebar__button">
            <button
              className="sidebar__buttoncss"
              onClick={() => visibleInput()}
            >
              New Project
            </button>
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <div className="InputProyect" id="inputProject">
                <TextField
                  id="outlined-basic"
                  label="Project Name"
                  variant="outlined"
                  className="sidebar__input"
                />
                <button className="sidebar__buttoncss">Add Project</button>
              </div>
            </form>
            <div className="sidebar__info">
              <h2>Your Projects</h2>
              {/* this are the projects array */}
              <p>Api rest</p>
              <p>Mern Project</p>
            </div>
          </div>
        </div>
      </List>
      <Divider />
      <List></List>
    </div>
  );
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="div__contenedornav">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <ViewHeadlineIcon
            className="button__navi"
            onClick={toggleDrawer(anchor, true)}
            style={{
              width: "2rem",
              height: "2rem",
              position: "absolute",
              color: "white",
            }}
          >
            {anchor}
          </ViewHeadlineIcon>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SideBar;
