import { ListAlt } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Tasks.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import {
  getTaskToEditAction,
  setStatusDeleteAction,
  setStatusEditAction,
} from "./../actions/projectsActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import firebase from "firebase";

import { db } from "./../firebase";

// here the material ui code
import Slide from "@material-ui/core/Slide";
import SubTareas from "./SubTareas";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    width: "95%",
  },
}));

function Tasks({ projectoTask, taskId, tasks }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  const classes = useStyles();
  // here the state to change open to close
  const [open, setOpen] = useState(false);
  const [subtask, setSubtask] = useState("");
  const [mas, setMas] = useState(true);
  const [subtasks, setSubtareas] = useState([]);

  const handleClickComplete = () => {
    if (projectoTask !== null) {
      db.collection("projectos")
        .doc(projectoTask.id)
        .collection("tasks")
        .doc(taskId)
        .update({
          status: true,
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  useEffect(() => {
    setStatus(tasks.status);
  }, [status, tasks, projectoTask]);

  useEffect(() => {
    db.collection("projectos")
      .doc(projectoTask.id)
      .collection("tasks")
      .doc(taskId)
      .collection("subtasks")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        setSubtareas(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            subtarea: doc.data(),
          }))
        );
      });
  }, []);
  const handleClickImcomplete = () => {
    if (projectoTask !== null) {
      db.collection("projectos")
        .doc(projectoTask.id)
        .collection("tasks")
        .doc(taskId)
        .update({
          status: false,
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  const handleClickEdit = (taskId, tasks) => {
    dispatch(getTaskToEditAction(taskId, tasks));
    dispatch(setStatusEditAction(false));
  };

  const handleClick = () => {
    if (projectoTask !== null) {
      Swal.fire({
        title: `Delete Task: ${tasks.name}?`,
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
            .doc(projectoTask.id)
            .collection("tasks")
            .doc(taskId)
            .delete()
            .then(function () {
              console.log("Tarea Eliminada con exito");
            })
            .catch((error) => {
              console.log(error.message);
            });
          Swal.fire({
            position: "top-end",
            width: "20rem",
            heightAuto: "true",
            padding: "0.8rem",
            icon: "success",
            text: "Your task has been deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  const handleClickShowDiv = () => {
    let divvisibility = document.getElementById("subtareas__inputshow");

    if (divvisibility.style.display === "block") {
      divvisibility.style.display = "none";
      setMas(true);
    } else {
      divvisibility.style.display = "block";
      setMas(false);
    }
  };

  const handleClickSave = (e) => {
    e.preventDefault();
    if (subtask) {
      db.collection("projectos")
        .doc(projectoTask.id)
        .collection("tasks")
        .doc(taskId)
        .collection("subtasks")
        .add({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          subtaskname: subtask,
        });
      setSubtask("");
    }
  };
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <div className="tasks">
              <div className="tasks__titlecontainer">
                <h3 className="tasks__title">{tasks.name}</h3>
              </div>
              <div className="tasks__actions">
                {status ? (
                  <button
                    className="tasks__buttonsIncomplete"
                    onClick={handleClickImcomplete}
                  >
                    <p>Complete</p>
                    <CheckCircleIcon
                      style={{ marginLeft: "0.7rem", color: "green" }}
                    />
                  </button>
                ) : (
                  <button
                    className="tasks__buttonsIncomplete"
                    onClick={handleClickComplete}
                  >
                    <p>Incomplete</p>
                    <HighlightOffIcon
                      style={{ marginLeft: "0.7rem", color: "red" }}
                    />
                  </button>
                )}

                <button className="tasks__buttonedit">
                  <EditIcon
                    onClick={() => handleClickEdit(taskId, tasks)}
                    style={{ color: "green", cursor: "pointer" }}
                  />
                </button>
                <button onClick={handleClick} className="tasks__buttondelete">
                  <DeleteForeverIcon
                    style={{ color: "red", cursor: "pointer" }}
                  />
                </button>
              </div>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ msOverflowY: "scroll" }}>
          <Typography style={{ width: "100%" }}>
            <form>
              <div className="tasks__subtasks">
                {/* subtasks here */}
                {/* {mas ? (
                  <div className="tasks__infoiconsmas">
                    <AddCircleOutlineIcon onClick={handleClickShowDiv} />{" "}
                    <p>Add sub-tasks</p>
                  </div>
                ) : (
                  <div className="tasks__infoiconsmas">
                    <RemoveCircleOutlineRoundedIcon
                      onClick={handleClickShowDiv}
                    />{" "}
                    <p>Add sub-tasks</p>
                  </div>
                )} */}

                <div className="subtareas__input" id="subtareas__inputshow">
                  <input
                    type="text"
                    placeholder={"#Sub-task here! Enter to save!"}
                    value={subtask}
                    onChange={(e) => setSubtask(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={!subtask}
                    onClick={handleClickSave}
                  >
                    Save
                  </button>
                </div>
                {subtasks?.map(({ id, subtarea }) => (
                  <SubTareas
                    key={id}
                    idsubtarea={id}
                    subtarea={subtarea}
                    projectoTarea={projectoTask.id}
                    tareaId={taskId}
                  />
                ))}
              </div>
            </form>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Tasks;
