import { Route, Routes } from "react-router-dom";
import "./App.css";
import BreakoutExam from "./pages/examples/breakout";
import RxJSHome from "./pages/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RxJSHome />}></Route>
        <Route path="/examples/breakout" element={<BreakoutExam />}></Route>
      </Routes>
    </div>
  );
}

export default App;
