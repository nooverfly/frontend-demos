import { useTextSelection } from "ahooks";

const UseTextSelection = () => {
  const { text } = useTextSelection();

  return (
    <div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, sint a
        tempora pariatur unde accusantium ipsum nam temporibus eius provident
        nostrum doloremque est perferendis! Esse exercitationem possimus ipsum
        incidunt atque!
      </p>
      <p>Result: {text}</p>
    </div>
  );
};

export default UseTextSelection;
