import React from "react";
import "./App.css";
import SideBar from "./layout/SideBar";
import Header from "./layout/Header";

function App() {
  return (
    <div className="app">
      <div className="app_container">
        <SideBar />
        <Header />
      </div>
    </div>
  );
}

export default App;
