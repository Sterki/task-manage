import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import "./Subtareas.css";
import { db } from "./../firebase";
import { Tooltip } from "@material-ui/core";

function SubTareas({ subtarea, idsubtarea, projectoTarea, tareaId }) {
  const handleClickDelete = (e) => {
    e.preventDefault();

    db.collection("projectos")
      .doc(projectoTarea)
      .collection("tasks")
      .doc(tareaId)
      .collection("subtasks")
      .doc(idsubtarea)
      .delete()
      .then(function () {
        console.log("subtasks Deleted");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="subtareas">
        <div>
          <h4>{subtarea.subtaskname}</h4>
        </div>
        <div className="subtareas__buttons">
          {/* <button className="tasks__buttonsIncomplete">
            
            <CheckCircleIcon style={{ color: "green" }} />
          </button> */}
          {/* <button className="tasks__buttonedit">
          <EditIcon style={{ color: "green", cursor: "pointer" }} />
        </button> */}
          <button className="tasks__buttondelete" onClick={handleClickDelete}>
            <Tooltip title="Delete Sub-Task">
              <DeleteForeverIcon style={{ color: "red", cursor: "pointer" }} />
            </Tooltip>
          </button>
        </div>
      </div>
    </>
  );
}

export default SubTareas;
