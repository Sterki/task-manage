import { ListAlt } from "@material-ui/icons";
import React, { useState } from "react";
import "./Tasks.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
function Tasks({ tasks }) {
  const [status, setStatus] = useState(false);

  const handleClickComplete = () => {
    setStatus(true);
  };
  const handleClickImcomplete = () => {
    setStatus(false);
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
          <EditIcon style={{ color: "green", cursor: "pointer" }} />
        </button>
        <button className="tasks__buttondelete">
          <DeleteForeverIcon style={{ color: "red", cursor: "pointer" }} />
        </button>
      </div>
    </div>
  );
}

export default Tasks;
