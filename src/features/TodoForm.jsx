import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef();
  const [workingTodoTitle, setWorkingTodo] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodo('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId={'todoTitle'}
        labelText={'Todo'}
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodo(event.target.value)}
      />
      <button disabled={!workingTodoTitle}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
