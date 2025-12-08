import { todos } from './App';
import TodoListItem from './TodoListItem';

function TodoList() {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default TodoList;
