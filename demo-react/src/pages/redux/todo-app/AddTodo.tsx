import { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "./store/actions";

const AddTodo = ({ addTodo }: any) => {
  const [inputVal, setInputVal] = useState("");

  const handleAddTodo = () => {
    addTodo(inputVal);
    setInputVal("");
  };

  return (
    <div>
      <input onChange={(e) => setInputVal(e.target.value)} value={inputVal} />
      <button className="add-todo" onClick={handleAddTodo}>
        Add Todo
      </button>
    </div>
  );
};

export default connect(null, { addTodo })(AddTodo);
