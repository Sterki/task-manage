import React, { useEffect } from "react";
import "./App.css";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import TasksProjects from "./components/TasksProjects";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { getUserAuthAction } from "./actions/userActions";

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
      dispatch(getUserAuthAction(authUsuer));
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
