import TodoListItem from './TodoListItem';
import Style from './TodoList.module.css';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter((todo) => todo.isCompleted !== true);

  return filteredTodoList.length ? (
    <ul className={`${Style.padding} ${Style.noBullet}`}>
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
