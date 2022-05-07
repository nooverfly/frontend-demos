import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainAppHome from "./pages/home";
import ReactChild from "./pages/react-child";
import TestPage from "./pages/test";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainAppHome />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
        <Route
          path="/rxjs/*"
          element={
            <ReactChild
              name="demo-rxjs"
              baseroute="/rxjs/"
              url="https://nooverfly.github.io/frontend-demos/demo-rxjs"
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
