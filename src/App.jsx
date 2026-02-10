import {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useContext,
} from 'react';
import './App.css';
import Styles from './App.module.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';
import { ExampleContext } from './AppContext';

function App() {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const [todosState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirections] = useState('desc');
  const { queryString } = useContext(ExampleContext);

  const encodeUrl = useCallback(() => {
    let searchQuery = '';
    const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [{ sortField, sortDirection, queryString }]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      const options = {
        method: 'GET',
        headers: { Authorization: token },
      };

      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );

        if (!resp.ok) {
          throw new Error(resp.errorMessage);
        } else {
          const { records } = await resp.json();
          dispatch({ type: todoActions.loadTodos, payload: records });
        }
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, payload: error.message });
      }
    };
    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  async function handleAddTodo(newTodo) {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo,
          },
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    dispatch({ type: todoActions.startRequest });

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();
        dispatch({ type: todoActions.addTodo, payload: records });
      }
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, payload: error.message });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  async function completeTodo(id) {
    const payload = {
      records: [
        {
          id,
          fields: {
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    dispatch({ type: todoActions.startRequest });

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();
        dispatch({ type: todoActions.completeTodo, payload: records });
      }
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, payload: error.message });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  async function updateTodo(editedTodo) {
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    dispatch({ type: todoActions.startRequest });

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

      if (!resp.ok) {
        throw new Error(resp.errorMessage);
      } else {
        const { records } = await resp.json();
        dispatch({ type: todoActions.updateTodo, payload: records });
      }
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, payload: error.message });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  return (
    <div className={`${Styles.center} ${Styles.backgroundImage}`}>
      <div>
        <h1>Todo List</h1>
        <TodoForm onAddTodo={handleAddTodo} isSaving={todosState.isSaving} />
        {todosState.isLoading ? (
          <p>Todo list loading...</p>
        ) : (
          <>
            <TodoList
              todoList={todosState.todoList}
              onCompleteTodo={completeTodo}
              onUpdateTodo={updateTodo}
            />
            {todosState.errorMessage && (
              <div className={Styles.border}>
                <hr />
                <p>{todosState.errorMessage}</p>
                <button
                  onClick={() => dispatch({ type: todoActions.clearError })}
                >
                  dismiss
                </button>
              </div>
            )}
          </>
        )}
        <hr />
        <TodosViewForm
          sortDirection={sortDirection}
          setSortDirection={setSortDirections}
          sortField={sortField}
          setSortField={setSortField}
        />
      </div>
    </div>
  );
}

export default App;
