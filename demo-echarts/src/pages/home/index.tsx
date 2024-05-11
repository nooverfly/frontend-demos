import { useRef } from "react";

const Home = () => {
  const rootRef = useRef(null);

  const full = () => {
    console.log(window, document);
    document.getElementsByClassName("echarts-root")[0].requestFullscreen();
  };

  const exit = () => {
    document.exitFullscreen();
  };

  return (
    <div ref={rootRef}>
      Home
      <button onClick={full}>全屏</button>
      <button onClick={exit}>退出全屏</button>
    </div>
  );
};

export default Home;
