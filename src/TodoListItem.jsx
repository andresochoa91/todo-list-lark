function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <form>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onCompleteTodo(todo.id)}
      />
      {todo.title}
    </form>
  );

  // <li></li>;
}

export default TodoListItem;
