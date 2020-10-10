import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import "./Subtareas.css";

function SubTareas() {
  return (
    <>
      
      <div className="subtareas">
        <div>
          <h4>Sub task 1</h4>
        </div>
        <div className="subtareas__buttons">
          <button className="tasks__buttonsIncomplete">
            {/* <p>Complete</p> */}
            <CheckCircleIcon style={{ color: "green" }} />
          </button>
          {/* <button className="tasks__buttonedit">
          <EditIcon style={{ color: "green", cursor: "pointer" }} />
        </button> */}
          <button className="tasks__buttondelete">
            <DeleteForeverIcon style={{ color: "red", cursor: "pointer" }} />
          </button>
        </div>
      </div>
    </>
  );
}

export default SubTareas;
