import React, { useState, useEffect } from 'react';
import './App.css';
import img from './To-Do-Img/images/icon.png';

function App() {
  // Retrieve tasks from localStorage on component mount
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [inputValue, setInputValue] = useState('');

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue === '') {
      alert('You should write something');
    } else {
      setTasks([...tasks, { text: inputValue, checked: false }]);
      setInputValue('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
  };

  const deleteTask = (index, event) => {
    event.stopPropagation(); // Stop event propagation to prevent toggling of checked state
    const newTasks = [...tasks];
    newTasks.splice(index, 1); 
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="todo">
          <h2>To-Do List <img src={img} alt="" /></h2>
          <div className="row">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add your list"
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul id="list-container">
            {tasks.map((task, index) => (
              <li
                className={task.checked ? 'checked' : ''}
                key={index}
                onClick={() => toggleTask(index)}
              >
                {task.text}
                <button className="close-button" onClick={(event) => deleteTask(index, event)}>
                  <img src="https://cdn-icons-png.flaticon.com/512/9312/9312232.png" alt="Close" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
