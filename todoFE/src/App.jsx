import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login/Login";
import SignUpForm from "./components/Signup/Signup";
import TodoList from "./components/TodoList/TodoList";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Web Plus Academy</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/home" element={<TodoList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
