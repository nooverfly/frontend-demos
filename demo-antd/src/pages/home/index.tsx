import { Select } from "antd";

const { Option } = Select;

const Home = () => {
  const changeTheme = () => {
    document.getElementsByTagName("html")[0].classList.add("dark");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={changeTheme}>切换</button>
      <div className="bg-white dark:bg-slate-800">
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation,
          including upside-down. It even works in outer space.
        </p>
      </div>
      <div>
        <Select value="123">
          <Option value="123">123</Option>
        </Select>
      </div>
    </div>
  );
};

export default Home;
