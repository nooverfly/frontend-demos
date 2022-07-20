import { connect } from "react-redux";
import { getTodosByVisibilityFilter } from "./store/selectors";
import Todo from "./Todo";

const TodoList = ({ todos }: any) => {
  return (
    <ul className="todo-list">
      {todos && todos.length
        ? todos.map((todo: any, index: number) => {
            return <Todo key={`todo-${todo.id}`} todo={todo} />;
          })
        : "No todos, yay!"}
    </ul>
  );
};

const mapStateToProps = (state: any) => {
  const { visibilityFilter } = state;
  const todos = getTodosByVisibilityFilter(state, visibilityFilter);
  return { todos };
};

export default connect(mapStateToProps)(TodoList);
