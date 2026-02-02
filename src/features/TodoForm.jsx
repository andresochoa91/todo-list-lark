import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef();
  const [workingTodoTitle, setWorkingTodo] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodo('');
    todoTitleInput.current.focus();
  }

  const StyledButton = styled.button`
    color: ${(props) => props.color || 'green'};
    font-family: ${(props) => props.disabled && 'italic'};
  `;

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId={'todoTitle'}
        labelText={'Todo'}
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodo(event.target.value)}
      />
      <StyledButton disabled={!workingTodoTitle} color="beige">
        {isSaving ? 'Saving...' : 'Add todo'}
      </StyledButton>
    </form>
  );
}

export default TodoForm;
