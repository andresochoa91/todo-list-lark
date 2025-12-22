// import { todos } from './App';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter((todo) => todo.isCompleted !== true);

  return todoList.length ? (
    <ul>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onCompleteTodo={onCompleteTodo}
        />
      ))}
    </ul>
  ) : (
    <p>Add todo above to get started</p>
  );
}

export default TodoList;
