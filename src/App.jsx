import React from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      {React.createElement('h1', { style: { color: 'blue' } }, 'Todo List')}
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
