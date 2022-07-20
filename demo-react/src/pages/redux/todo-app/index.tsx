import { Provider } from "react-redux";
import AddTodo from "./AddTodo";
import store from "./store/store";
import TodoList from "./TodoList";
import VisibilityFilters from "./VisibilityFilters";

const TodoLists = () => {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
};

const TodoApp = () => {
  return (
    <Provider store={store}>
      <TodoLists />
    </Provider>
  );
};

export default TodoApp;
