import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./tasksprojects.css";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { auth, db } from "./../firebase";
import { getTaskProjectAction } from "./../actions/projectsActions";
import Tasks from "./Tasks";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    width: "100%",
    marginTop: "1rem",
  },
}));
function TasksProjects() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const projectName = useSelector((state) => state.project.projectTaskAdd);
  const listtasks = useSelector((state) => state.project.listtasks);

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // here goes the code tu add a new task inside our project with firebase
    if (projectName !== null) {
      db.collection("projectos")
        .doc(projectName.id)
        .collection("tasks")
        .add({
          delete: 0,
          name: name,
          status: false,
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        history.push("/");
      } else {
        console.log("wellcome!!");
      }
    });
  }, [history]);
  useEffect(() => {
    if (projectName !== null) {
      console.log(projectName.id);
      db.collection("projectos")
        .doc(projectName.id)
        .collection("tasks")
        .onSnapshot((snapshot) => {
          dispatch(
            getTaskProjectAction(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                tasks: doc.data(),
              }))
            )
          );
        });
    }
  }, [projectName]);

  return (
    <>
      <div className="tasksprojects">
        {projectName ? <h2>Project: {projectName.project.name} </h2> : null}
        {!projectName ? (
          <Alert style={{ margin: "2rem" }} severity="warning">
            You should first select a project to Add a new Task
          </Alert>
        ) : (
          <div className="tasksprojects__header">
            <form className={classes.root} noValidate autoComplete="off">
              {/* a input to set the name of the task */}

              <TextField
                className="tasksprojects__input"
                id="filled-basic"
                label="Task name"
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
                Save Task
              </Button>
            </form>
          </div>
        )}
      </div>
      <div className="tasksprojects__hrcontainer">
        <hr />
      </div>
      <div className="taskproject__tasks">
        <h2>Tasks here</h2>
        <div className="tasksprojects__content">
          {listtasks?.map(({ id, tasks }) => (
            <Tasks key={id} tasks={tasks} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TasksProjects;
