import React from "react";
import { Link } from "react-router-dom";
import "./Projects.css";

function Projects({ doc }) {
  const handleClick = (doc) => {
    console.log(doc);
  };

  return (
    <div className="projects">
      <Link
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => handleClick(doc)}
        to="tasks"
      >
        <p className="projects__ptag">{doc.name}</p>
      </Link>
    </div>
  );
}

export default Projects;
