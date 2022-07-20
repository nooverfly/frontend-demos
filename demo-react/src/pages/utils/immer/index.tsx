import produce from "immer";
import { memo, useCallback, useReducer, useState } from "react";
import { useImmer, useImmerReducer } from "use-immer";

const Todo = memo(({ todo, onToggle }: any) => (
  <li>
    <input
      type="checkbox"
      checked={todo.done}
      onClick={() => onToggle(todo.id)}
    />
    {todo.title}
  </li>
));

const StateWithImmer = () => {
  const [todos, setTodos] = useState([
    {
      id: "React",
      title: "Learn React",
      done: true,
    },
    {
      id: "Immer",
      title: "Try immer",
      done: false,
    },
  ]);

  const unfinishCount = todos.filter((todo) => todo.done === false).length;

  const handleToggle = useCallback((id: string) => {
    setTodos(
      produce((draft) => {
        const todo = draft.find((todo) => todo.id === id)!;
        todo.done = !todo.done;
      })
    );
  }, []);

  const handleAdd = useCallback(() => {
    setTodos(
      produce((draft) => {
        draft.push({
          id: "todo_" + Math.random(),
          title: "A new todo",
          done: false,
        });
      })
    );
  }, []);

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      Tasks left: {unfinishCount}
    </div>
  );
};

const UserImmer = () => {
  const [todos, setTodos] = useImmer([
    {
      id: "React",
      title: "Learn React",
      done: true,
    },
    {
      id: "Immer",
      title: "Try immer",
      done: false,
    },
  ]);

  const unfinishCount = todos.filter((todo) => todo.done === false).length;

  const handleToggle = useCallback((id: string) => {
    setTodos((draft) => {
      const todo = draft.find((todo) => todo.id === id)!;
      todo.done = !todo.done;
    });
  }, []);

  const handleAdd = useCallback(() => {
    setTodos((draft) => {
      draft.push({
        id: "todo_" + Math.random(),
        title: "A new todo",
        done: false,
      });
    });
  }, []);

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      Tasks left: {unfinishCount}
    </div>
  );
};

const ReducerImmer = () => {
  const [todos, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.type) {
        case "toggle":
          const todo = draft.find((todo: any) => todo.id === action.id);
          todo.done = !todo.done;
          break;
        case "add":
          draft.push({
            id: action.id,
            title: "A new todo",
            done: false,
          });
          break;
        default:
          break;
      }
    }),
    [
      {
        id: "React",
        title: "Learn React",
        done: true,
      },
      {
        id: "Immer",
        title: "Try immer",
        done: false,
      },
    ]
  );
  const unfinishCount = todos.filter((todo: any) => todo.done === false).length;

  const handleToggle = useCallback((id: any) => {
    dispatch({
      type: "toggle",
      id,
    });
  }, []);

  const handleAdd = useCallback(() => {
    dispatch({
      type: "add",
      id: "todo_" + Math.random(),
    });
  }, []);

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo: any) => (
          <Todo todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      Tasks left: {unfinishCount}
    </div>
  );
};

const UserImmerReducer = () => {
  const [todos, dispatch] = useImmerReducer(
    (draft, action) => {
      switch (action.type) {
        case "toggle":
          const todo = draft.find((todo: any) => todo.id === action.id)!;
          todo.done = !todo.done;
          break;
        case "add":
          draft.push({
            id: action.id,
            title: "A new todo",
            done: false,
          });
          break;
        default:
          break;
      }
    },
    [
      {
        id: "React",
        title: "Learn React",
        done: true,
      },
      {
        id: "Immer",
        title: "Try immer",
        done: false,
      },
    ]
  );
  const unfinishCount = todos.filter((todo: any) => todo.done === false).length;

  const handleToggle = useCallback((id: any) => {
    dispatch({
      type: "toggle",
      id,
    });
  }, []);

  const handleAdd = useCallback(() => {
    dispatch({
      type: "add",
      id: "todo_" + Math.random(),
    });
  }, []);

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo: any) => (
          <Todo todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      Tasks left: {unfinishCount}
    </div>
  );
};

const ImmerDemo = () => {
  return (
    <div>
      <StateWithImmer />
      <UserImmer />
      <ReducerImmer />
      <UserImmerReducer />
    </div>
  );
};

export default ImmerDemo;
