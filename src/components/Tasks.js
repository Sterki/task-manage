import { ListAlt } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Tasks.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { getTaskToEditAction } from "./../actions/projectsActions";
import { useDispatch } from "react-redux";
import { db } from "./../firebase";

function Tasks({ projectoTask, taskId, tasks }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState();

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
        <button className="tasks__buttondelete">
          <DeleteForeverIcon style={{ color: "red", cursor: "pointer" }} />
        </button>
      </div>
    </div>
  );
}

export default Tasks;
