import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";
import { setProjectTaskAction } from "./../actions/projectsActions";
import { useDispatch, useSelector } from "react-redux";

function Projects({ projectId, project }) {
  const dispatch = useDispatch();

  const handleClick = (projectId, project) => {
    dispatch(setProjectTaskAction(projectId, project));
  };
  return (
    <div className="projects">
      <Link
        onClick={() => handleClick(projectId, project)}
        style={{ textDecoration: "none", color: "black" }}
        to="/tasks"
      >
        <p className="projects__ptag">{project.name}</p>
      </Link>
    </div>
  );
}

export default Projects;
