import React, { useEffect, useState } from "react";
import "./ProjectPage.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Draggable from "react-draggable";
import { db } from "./../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getTaskProjectAction } from "../actions/projectsActions";
import ListOfTask from "./ListOfTask";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ListOfProjects({ projectId, project }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const listoftask = useSelector((state) => state.project.listtask);
  const [listadotareas, setListado] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("projectos")
      .doc(projectId)
      .collection("tasks")
      .onSnapshot((snapshot) => {
        setListado(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            tasks: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="projectspage__info">
      <Draggable axis="both" scale={1} grid={[25, 25]} scale={1}>
        <Card className={classes.root}>
          <CardContent style={{ padding: "0rem" }}>
            <Typography
              className={classes.title}
              gutterBottom
              style={{
                backgroundColor: "#000000",
                padding: "0.4rem",
              }}
            >
              <h3 className="listoftask__h3">{project.name}</h3>
            </Typography>
            <Typography
              className={classes.pos}
              color="textSecondary"
              style={{ borderBottom: "1px solid lightgray", padding: "0.4rem" }}
            >
              <h4>Tasks</h4>
            </Typography>
            <Typography
              variant="body2"
              component="p"
              style={{ padding: "0.5rem" }}
            >
              {listadotareas?.map(({ id, tasks }) => (
                <ListOfTask key={id} tasks={tasks} />
              ))}
            </Typography>
          </CardContent>
        </Card>
      </Draggable>
    </div>
  );
}

export default ListOfProjects;
