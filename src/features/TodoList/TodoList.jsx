import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter((todo) => todo.isCompleted !== true);

  return filteredTodoList.length ? (
    <ul>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  ) : (
    <p>Add todo above to get started</p>
  );
}

export default TodoList;
