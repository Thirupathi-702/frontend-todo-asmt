import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', status: 'pending' });
  const [filter, setFilter] = useState('all'); 
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get('https://backend1-5dga.onrender.coms/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(res.data);
    };
    fetchTodos();
  }, [token]);

  const handleChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const addTodo = async () => {
    const res = await axios.post('https://backend1-5dga.onrender.com/api/todos', newTodo, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos([...todos, { ...newTodo, id: res.data.todoId }]);
    setNewTodo({ title: '', description: '', status: 'pending' });
  };

  const updateTodo = async (id, updatedTodo) => {
    await axios.put(`https://backend1-5dga.onrender.com/api/todos/${id}`, updatedTodo, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://backend1-5dga.onrender.com/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    return todo.status === filter;
  });

  return (
    <div className="todo-container">
      <h2>Todo List</h2>

      <div className="todo-inputs">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={newTodo.title}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={newTodo.description}
        />
        <select name="status" onChange={handleChange} value={newTodo.status}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div className="todo-filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={() => setFilter('in-progress')}>In Progress</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.status}`}>
            <span>{todo.title} - {todo.description} - {todo.status}</span>
            {todo.status !== 'completed' && (
              <button
                onClick={() =>
                  updateTodo(todo.id, { ...todo, status: todo.status === 'pending' ? 'in-progress' : 'completed' })
                }
              >
                {todo.status === 'pending' ? 'Start' : 'Complete'}
              </button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
