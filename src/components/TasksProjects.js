import { Button, Modal, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./tasksprojects.css";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { auth, db } from "./../firebase";
import {
  getTaskProjectAction,
  deleteProjectFirebaseAction,
} from "./../actions/projectsActions";
import Tasks from "./Tasks";
import TaskToEdit from "./TaskToEdit";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";
import Swal from "sweetalert2";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    width: "100%",
    marginTop: "1rem",
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
function TasksProjects() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const projectName = useSelector((state) => state.project.projectTaskAdd);
  const listtasks = useSelector((state) => state.project.listtasks);
  const tasktoedit = useSelector((state) => state.project.tasktoedit);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setError(true);
      return;
    }
    // here goes the code tu add a new task inside our project with firebase
    if (projectName !== null) {
      db.collection("projectos")
        .doc(projectName.id)
        .collection("tasks")
        .add({
          delete: 0,
          name: name,
          status: false,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch((error) => {
          console.log(error.message);
        });
      setName("");
      setError(false);
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
      db.collection("projectos")
        .doc(projectName.id)
        .collection("tasks")
        .orderBy("created", "desc")
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

  const handleClickEliminar = () => {
    if (projectName !== null) {
      Swal.fire({
        title: `Delete Project: ${projectName.project.name}?`,
        text: "You won't be able to revert this!",
        width: "28rem",
        padding: "0.8rem",
        heightAuto: "true",
        iconColor: "#ff471a",
        position: "top",
        showCancelButton: true,
        confirmButtonColor: "rgb(37, 37, 37)",
        cancelButtonColor: "#cc0000",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          db.collection("projectos")
            .doc(projectName.id)
            .delete()
            .then(function () {
              console.log("projecto eliminado");
            })
            .catch(function (error) {
              alert("error removing document", error.message);
            });
          dispatch(deleteProjectFirebaseAction());
          Swal.fire({
            position: "top-end",
            width: "20rem",
            heightAuto: "true",
            padding: "0.8rem",
            icon: "success",
            text: "Your project has been deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };
  return (
    <>
      {tasktoedit !== null ? (
        <TaskToEdit
          setError={setError}
          taskid={tasktoedit.id}
          task={tasktoedit.task}
          projectId={projectName.id}
        />
      ) : (
        <div className="tasksprojects">
          {projectName ? (
            <div className="tasksprojects__subheader">
              <h2>Project: {projectName.project.name} </h2>
              <button
                className="button_deleteproject"
                onClick={handleClickEliminar}
              >
                <p>Delete project</p>
                <ClearIcon style={{ color: "red" }} />
              </button>
            </div>
          ) : null}
          {!projectName ? (
            <Alert style={{ margin: "2rem" }} severity="warning">
              You should first select a project to Add a new Task
            </Alert>
          ) : (
            <div className="tasksprojects__header">
              <form className={classes.root} noValidate autoComplete="off">
                {/* a input to set the name of the task */}
                {error ? (
                  <div className={classes.root}>
                    <Alert severity="error">The field name is required!</Alert>
                  </div>
                ) : null}

                <TextField
                  className="tasksprojects__input"
                  id="filled-basic"
                  label="Task name"
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
                  <p>Save Task</p>
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      <div className="tasksprojects__hrcontainer">
        <hr></hr>
      </div>

      {projectName !== null ? (
        <div className="taskproject__tasks">
          <h2>#tasks</h2>

          <div className="tasksprojects__content">
            <TransitionGroup>
              {listtasks.map(({ id, tasks }) => (
                <CSSTransition
                  key={id}
                  timeout={200}
                  classNames="tasksprojects__styles"
                >
                  <Tasks taskId={id} tasks={tasks} projectoTask={projectName} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
      ) : (
        <div className="taskprojects__alertmessage">
          <Alert style={{ margin: "2rem" }} severity="warning">
            You should first select a project to Add a new Task
          </Alert>
        </div>
      )}
    </>
  );
}

export default TasksProjects;
