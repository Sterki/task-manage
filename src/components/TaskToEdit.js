import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import "./tasksprojects.css";
import { db } from "./../firebase";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    width: "100%",
    marginTop: "1rem",
  },
}));
function TaskToEdit({ taskid, task, projectId }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [newname, setNewName] = useState("");
  console.log(projectId, " ", taskid, " ", name);

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
  };
  return (
    <div className="tasksprojects">
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

          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Edit Task
          </Button>
        </form>
      </div>
    </div>
  );
}

export default TaskToEdit;
