import { ListAlt } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Tasks.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  getTaskToEditAction,
  setStatusDeleteAction,
  setStatusEditAction,
} from "./../actions/projectsActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { db } from "./../firebase";

// here the material ui code
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Tasks({ projectoTask, taskId, tasks }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState();

  // here the state to change open to close
  const [open, setOpen] = useState(false);

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
        icon: 'warning',
        iconColor: '#ff471a',
        showCancelButton: true,
        confirmButtonColor: 'rgb(37, 37, 37)',
        cancelButtonColor: '#cc0000',
        confirmButtonText: 'Yes, delete it!'
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
            icon: "success",
            title: "Your task has been Deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };
  return (
    <div className="tasks">
      <div className="tasks__titlecontainer">
        <h2 className="tasks__title">{tasks.name}</h2>
      </div>
      <div className="tasks__actions">
        {status ? (
          <button
            className="tasks__buttonsIncomplete"
            onClick={handleClickImcomplete}
          >
            <p>Complete</p>
            <CheckCircleIcon style={{ marginLeft: "0.7rem", color: "green" }} />
          </button>
        ) : (
          <button
            className="tasks__buttonsIncomplete"
            onClick={handleClickComplete}
          >
            <p>Incomplete</p>
            <HighlightOffIcon style={{ marginLeft: "0.7rem", color: "red" }} />
          </button>
        )}

        <button className="tasks__buttonedit">
          <EditIcon
            onClick={() => handleClickEdit(taskId, tasks)}
            style={{ color: "green", cursor: "pointer" }}
          />
        </button>
        <button onClick={handleClick} className="tasks__buttondelete">
          <DeleteForeverIcon style={{ color: "red", cursor: "pointer" }} />
        </button>
        
      </div>
    </div>
  );
}

export default Tasks;
