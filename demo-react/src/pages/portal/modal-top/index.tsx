import { useEffect, useRef, useState } from "react";
import MyModal from "./MyModal";

const TooltipTop = () => {
  const [visible, setVisible] = useState(true);

  // 一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先
  const clickHandler = (e: any) => {
    console.log(e);
  };

  return (
    <div>
      <div className="left"></div>
      <div className="right"></div>
      <div
        onClick={clickHandler}
        style={{
          width: "400",
          height: "100vh",
          background: "#000",
          zIndex: 0,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          position: "absolute",
          left: 700,
        }}
      >
        <div
          onClick={() => setVisible(!visible)}
          style={{
            fontSize: 40,
            color: "#FFF",
            height: 80,
          }}
        >
          点击
        </div>
        <MyModal
          width={200}
          height={200}
          top={200}
          left={300}
          visible={visible}
        />
      </div>
    </div>
  );
};

export default TooltipTop;
