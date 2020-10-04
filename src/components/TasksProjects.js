import { Button } from "@material-ui/core";
import React from "react";
import "./tasksprojects.css";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
function TasksProjects() {
  const projectName = useSelector((state) => state.project.projectTaskAdd);

  const classes = useStyles();
  return (
    <div className="tasksprojects">
      {projectName ? <h2>Project Name: {projectName.project.name} </h2> : null}
      {!projectName ? (
        <Alert style={{ margin: "2rem" }} severity="warning">
          You should first select a project to Add a new Task
        </Alert>
      ) : (
        <div className="tasksprojects__header">
          {/* a input to set the name of the task */}
          <input
            type="text"
            placeholder="type the task name"
            className="taskprojects__input"
            name="caption"
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

export default TasksProjects;
