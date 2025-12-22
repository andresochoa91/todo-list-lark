import { useState } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);

  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });

    setTodoList(updatedTodos);
  }

  function addTodo(title) {
    const newTodo = {
      title,
      id: Date.now(),
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
