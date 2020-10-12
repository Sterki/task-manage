import React, { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import TasksProjects from "./components/TasksProjects";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { auth, storage } from "./firebase";
import { useDispatch } from "react-redux";
import { getUserAuthAction, setImageUrlAction } from "./actions/userActions";
import Profile from "./components/Profile";
import ProjectsPage from "./components/ProjectsPage";
import { db } from "./firebase";

function wrappApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUsuer) => {
      if (authUsuer) {
        dispatch(getUserAuthAction(authUsuer));
        storage
          .ref("users/" + authUsuer?.uid + "/profile.jpg")
          .getDownloadURL()
          .then((imageUrl) => {
            dispatch(setImageUrlAction(imageUrl));
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profile">
              <SideBar />
              <Header />
              <Profile />
            </Route>
            <Route path="/projects">
              <SideBar />
              <Header />
              <ProjectsPage />
            </Route>
            <Route path="/tasks">
              <SideBar />
              <Header />
              <TasksProjects />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default wrappApp;
