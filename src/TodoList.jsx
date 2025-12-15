// import { todos } from './App';
import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
  return (
    <ul>
      {/* {todos.map((todo) => ( */}
      {todoList.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default TodoList;
