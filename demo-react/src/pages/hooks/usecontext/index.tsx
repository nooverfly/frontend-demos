import { useContext, useState } from "react";
import ThemeContext, { themes } from "./context";

const ThemedButton = ({ changeTheme }: any) => {
  const theme = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme.background, color: theme.foreground }}
      onClick={changeTheme}
    >
      I am styled by theme context!
    </button>
  );
};

const Toolbar = ({ changeTheme }: any) => {
  return (
    <div>
      <ThemedButton changeTheme={changeTheme} />
    </div>
  );
};

const UseContextDemo = () => {
  const [theme, setTheme] = useState(themes.dark);
  const changeTheme = () => {
    if (theme === themes.dark) {
      setTheme(themes.light);
    } else {
      setTheme(themes.dark);
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar changeTheme={changeTheme} />
    </ThemeContext.Provider>
  );
};

export default UseContextDemo;
