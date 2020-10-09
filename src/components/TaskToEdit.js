import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import "./tasksprojects.css";
import { db } from "./../firebase";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import {
  setTaskToEditAction,
  setStatusEditAction,
} from "./../actions/projectsActions";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    width: "100%",
    marginTop: "1rem",
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TaskToEdit({ taskid, task, projectId, setError }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [newname, setNewName] = useState("");
  const projectName = useSelector((state) => state.project.projectTaskAdd);

  useEffect(() => {
    setName(task.name);
  }, [taskid, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("projectos")
      .doc(projectId)
      .collection("tasks")
      .doc(taskid)
      .update({
        name: name,
      })
      .catch((error) => {
        console.log(error.message);
      });
    setName("");
    setError(false);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your task has been Edited",
      showConfirmButton: false,
      timer: 1500,
    });

    dispatch(setTaskToEditAction());
  };

  return (
    <>
      <div className="tasksprojects">
        <h2>Project: {projectName?.project.name} </h2>
        <div className="tasksprojects__header">
          <form className={classes.root} noValidate autoComplete="off">
            {/* a input to set the name of the task */}

            <TextField
              className="tasksprojects__input"
              id="filled-basic"
              label="Edit the name here ..."
              variant="filled"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              className="button__tasks"
              type="submit"
              onClick={handleSubmit}
            >
              <SaveIcon />
              <p>Edit Task</p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TaskToEdit;
