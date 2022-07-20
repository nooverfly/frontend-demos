import { connect } from "react-redux";
import { toggleTodo } from "./store/actions";

const Todo = ({ todo, toggleTodo }: any) => {
  return (
    <li className="todo-item" onClick={() => toggleTodo(todo.id)}>
      {todo && todo.completed ? "👌" : "👋"}
      <span
        className={`todo-item__text ${
          todo && todo.completed ? "todo-item__text--completed" : ""
        }`}
      >
        {todo.content}
      </span>
    </li>
  );
};

export default connect(null, { toggleTodo })(Todo);
