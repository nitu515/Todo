import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import todoReducer from "../../reducer/todoReducer";
import {
  fetchTodoList,
  fetchTodoListById,
  addTodoTask,
  updateTodoTask,
  deleteTodoTask,
} from "../../apiServices";
import { useQuery, useMutation } from "react-query";

const TodoContext = createContext();
let initialState = {
  todoList: [],
  loading: true,
  error: "",
  todoListByIdData: {},
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [isLogin, setLogin] = useState(
    localStorage.getItem("userToken") && true
  );
  const [editMode, setEditMode] = useState(false);

  const { data, error, isLoading, isError } = useQuery(
    "todoList",
    fetchTodoList
  );

  const fetchTodoById = async (id) => {
    const todoById = await fetchTodoListById(id);
    dispatch({ type: "FETCH_TODO_LIST_BY_ID_SUCCESS", payload: todoById });
  };
  const addTodoTaskMutation = useMutation(addTodoTask, {
    onSuccess: (newTask) => {
      const updatedTodoList = [...state.todoList, newTask];
      dispatch({ type: "ADD_TODO_SUCCESS", payload: updatedTodoList });
    },
    onError: (error) => {
      console.error("Error adding todo task:", error);
    },
  });
  const updateTodoTaskMutation = useMutation(updateTodoTask, {
    onSuccess: (updatedTask) => {
      const updatedTodoList = state.todoList.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      dispatch({ type: "UPDATE_TODO_SUCCESS", payload: updatedTodoList });
      setEditMode(false);
    },
    onError: (error) => {
      console.error("Error updating todo task:", error);
    },
  });
  const deleteTodoTaskMutation = useMutation(deleteTodoTask, {
    onSuccess: (deletedTaskId) => {
      console.log({ deletedTaskId });
      const updatedTodoList = state.todoList.filter(
        (task) => task.id !== deletedTaskId.id
      );
      console.log({ updatedTodoList });
      dispatch({ type: "DELETE_TODO_SUCCESS", payload: updatedTodoList });
    },
    onError: (error) => {
      console.error("Error deleting todo task:", error);
    },
  });
  useEffect(() => {
    if (data) {
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    }
  }, [data]);
  return (
    <TodoContext.Provider
      value={{
        ...state,
        isLogin,
        setLogin,
        fetchTodoById,
        addTodoTaskMutation,
        editMode,
        setEditMode,
        updateTodoTaskMutation,
        deleteTodoTaskMutation,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => {
  return useContext(TodoContext);
};
export { TodoProvider, useTodo };
