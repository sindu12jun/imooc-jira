import React from "react";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      <LoginScreen />
      {/*<ProjectListScreen />*/}
    </div>
  );
}

export default App;
