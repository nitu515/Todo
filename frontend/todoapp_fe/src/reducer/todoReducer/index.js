const todoReducer = (state, action) => {
  if (action.type === "FETCH_SUCCESS") {
    return {
      loading: false,
      error: "",
      todoList: action.payload,
    };
  }

  if (action.type === "FETCH_ERROR") {
    return {
      loading: false,
      error: "SOMETHING WENT WRONG",
      todoList: [],
    };
  }

  if (action.type === "FETCH_TODO_LIST_BY_ID_SUCCESS") {
    return {
      ...state,
      todoListByIdData: action.payload,
    };
  }

  if (action.type === "ADD_TODO_SUCCESS") {
    return {
      ...state,
      todoList: action.payload,
    };
  }

  if (action.type === "UPDATE_TODO_SUCCESS") {
    return {
      ...state,
      todoList: action.payload,
    };
  }
  if (action.type === "DELETE_TODO_SUCCESS") {
    return {
      ...state,
      todoList: action.payload,
    };
  }
  return state;
};

export default todoReducer;
