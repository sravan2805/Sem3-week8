import React, { useState, useEffect } from "react";
import "./TodoList.css";
import axios from "axios";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [userName, setuserName] = useState("");

  useEffect(() => {

    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    setuserName(username);

    const fetchTodos = async () => {

      let url = "http://localhost:3000/api/admin/getTask";
      try {

        const response = await axios.post(url, { email: email });
        console.log(response)
       
        const formattedTodos = response.data.todolist.map((task) => ({
          id: task._id,
          text: task.data,
          completed: task.isCompleted,
        }));

       
        setTodos(formattedTodos)

      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      }
    };

    fetchTodos(); // Call the function to fetch todos

  }, []); // Empty dependency array to run once on component mount

  const addTask = async() => {

    let url = "http://localhost:3000/api/admin/addTask";
      try {
        const email = localStorage.getItem("email");
        const response = await axios.post(url, { email: email, taskData: task});
        console.log(response)
       
        const formattedTodos = response.data.todolist.map((task) => ({
          id: task._id,
          text: task.data,
          completed: task.isCompleted,
        }));
       
        setTodos(formattedTodos)

      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      }

  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = async(id) => {

    let url = "http://localhost:3000/api/admin/deletetask";
    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(url, { email: email, taskId: id});
      console.log(response)
     
      const formattedTodos = response.data.todolist.map((task) => ({
        id: task._id,
        text: task.data,
        completed: task.isCompleted,
      }));
     
      setTodos(formattedTodos)

    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }


  };

  const doneTask = async (id) => {

    let url = "http://localhost:3000/api/admin/editstatus";
    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(url, { email: email, taskId: id});
      console.log(response)
     
      const formattedTodos = response.data.todolist.map((task) => ({
        id: task._id,
        text: task.data,
        completed: task.isCompleted,
      }));
     
      setTodos(formattedTodos)

    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }

  }

  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = async(id,text) => {
    let url = "http://localhost:3000/api/admin/edittask";
    try {
      const email = localStorage.getItem("email");
      console.log({ email: email, taskId: id, newTaskData:text})
      const response = await axios.post(url, { email: email, taskId: id, newTaskData:text});
      console.log(response)
     
      const formattedTodos = response.data.todolist.map((task) => ({
        id: task._id,
        text: task.data,
        completed: task.isCompleted,
      }));
     
      setTodos(formattedTodos)

    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }

    setEditId(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <h3>Welcome {userName}</h3>
      <h1>Todo List</h1>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>


      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >

            {editId === todo.id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={()=>saveEdit(todo.id,editText)}>Save</button>
              </div>
            ) : (
              <span onClick={() => toggleComplete(todo.id)} className="todo-text">
                {todo.text}
              </span>
            )}
            <button onClick={() => deleteTask(todo.id)} className="delete-btn">
              Delete
            </button>
            {editId !== todo.id && (
              <button
                onClick={() => startEditing(todo.id, todo.text)}
                className="edit-btn"
              >
                Edit
              </button>


            )}

            <button onClick={() => doneTask(todo.id)} className="done-btn">
              Done
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
