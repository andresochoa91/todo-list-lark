import TodoListItem from './TodoListItem';
import Style from './TodoList.module.css';
import { useSearchParams } from 'react-router';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter((todo) => todo.isCompleted !== true);

  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 4;

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams((params) => {
        params.set('page', currentPage - 1);
        return params;
      });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams((params) => {
        params.set('page', currentPage + 1);
        return params;
      });
    }
  };

  return (
    <>
      {filteredTodoList.length ? (
        <ul className={`${Style.padding} ${Style.noBullet}`}>
          {filteredTodoList
            .slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage)
            .map((todo) => (
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
      )}
      <div>
        <button onClick={handlePreviousPage}>Previous</button>
        {`Page: ${currentPage} of ${totalPages}`}
        <button onClick={handleNextPage}>Next</button>
      </div>
    </>
  );
}

export default TodoList;
