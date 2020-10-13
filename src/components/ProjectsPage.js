import React, { useEffect, useState } from "react";
import "./ProjectPage.css";
import ListOfProjects from "./ListOfProjects";
import { db } from "./../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setProjectUserAction } from "./../actions/projectsActions";

function ProjectsPage() {
  const [usuarioid, setUid] = useState("");
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.users.userAuth);
  const projectsListado = useSelector((state) => state.project.projectusertask);

  useEffect(() => {
    setUid(userid?.uid);
    db.collection("projectos")
      .where("uid", "==", `${userid?.uid}`)
      .onSnapshot((snapshot) => {
        dispatch(
          setProjectUserAction(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              project: doc.data(),
            }))
          )
        );
      });
  }, [userid, dispatch]);

  return (
    <div className="projecspage">
      <div className="projectpage__title">
        <h1>Project List</h1>
        <div className="projectpage__subtitle">
          <h3>#sort your tasks however you want#</h3>
        </div>
      </div>
      {projectsListado?.map(({ id, project }) => (
        <ListOfProjects key={id} projectId={id} project={project} />
      ))}
    </div>
  );
}

export default ProjectsPage;
