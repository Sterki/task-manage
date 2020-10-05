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
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const userLoged = useSelector((state) => state.users.userAuth);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((authUsuer) => {
      if (authUsuer) {
        // save the user into a state to work with it
        dispatch(getUserAuthAction(authUsuer));
      } else {
        // we need to delete from our state the user
      }
    });
  }, [userLoged]);
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
