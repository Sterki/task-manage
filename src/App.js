import React from "react";
import "./App.css";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="app">
      <div className="app_container">
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/">
                <SideBar />
                <Header />
              </Route>
            </Switch>
          </Router>
        </Provider>
      </div>
    </div>
  );
}

export default App;
