export const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button=
  clearError: 'clearError',
};

export const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos:
      return {
        ...state,
        todoList: action.payload.map((record) => {
          return {
            id: record.id,
            title: record.fields.title,
            isCompleted: record.fields.isCompleted ?? false,
          };
        }),
        isLoading: false,
      };
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actions.addTodo:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: action.payload[0].id,
            title: action.payload[0].fields.title,
            isCompleted: action.payload[0].fields.isCompleted,
          },
        ],
      };
    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    case actions.updateTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload[0].id) {
            return {
              id: action.payload[0].id,
              title: action.payload[0].fields.title,
              isCompleted: false,
            };
          } else {
            return todo;
          }
        }),
      };
    case actions.completeTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload[0].id) {
            return {
              isCompleted: true,
            };
          } else {
            return todo;
          }
        }),
      };
    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };
  }
}
