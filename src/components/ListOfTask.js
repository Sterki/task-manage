import React from "react";
import "./Listoftasks.css";

function ListOfTask({ tasks }) {
  return (
    <div className="listoftask__tasks">
      <p>{tasks.name}</p>
    </div>
  );
}

export default ListOfTask;
