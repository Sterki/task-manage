import React from "react";
import "./App.css";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import TasksProjects from "./components/TasksProjects";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/tasks">
              <SideBar />
              <Header />
              <TasksProjects />
            </Route>
            <Route path="/">
              <SideBar />
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
