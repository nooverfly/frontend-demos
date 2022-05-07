import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainAppHome from "./pages/home";
import TestPage from "./pages/test";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainAppHome />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
