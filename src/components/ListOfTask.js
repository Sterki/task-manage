import React from "react";

function ListOfTask({ tasks }) {
  return (
    <div>
      <p>{tasks.name}</p>
    </div>
  );
}

export default ListOfTask;
