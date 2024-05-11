import { Button, List } from "antd";
import { useEffect, useRef } from "react";
import { Viewer } from "./Viewer";

const GltfSchool = () => {
  const divRef = useRef<any>(null);
  const viewerRef = useRef<Viewer>(null);
  const prevRef = useRef(0);
  const objArrRef = useRef([]);

  useEffect(() => {
    if (divRef.current && !viewerRef.current) {
      const viewer = new Viewer(divRef.current);
      // @ts-ignore
      viewerRef.current = viewer;
      const objArr: any = [];
      objArrRef.current = objArr;
      viewer.load("/frontend-demos/demo-three/models/school/land.glb");
    }
  }, []);

  const selectFloor = (floor: number) => {
    if (prevRef.current) {
      viewerRef.current!.back(objArrRef.current[prevRef.current - 1]);
    }
    viewerRef.current!.select(objArrRef.current[floor - 1]);
    prevRef.current = floor;
  };

  const start = () => {
    viewerRef.current!.start(objArrRef.current);
  };

  const end = () => {
    if (prevRef.current) {
      viewerRef.current!.back(objArrRef.current[prevRef.current - 1]);
    }
    viewerRef.current!.end(objArrRef.current);
  };

  return (
    <>
      <div
        ref={divRef}
        className="wh100"
        style={{
          width: "calc(100vw - 200px)",
          height: "100vh",
          background: "#000",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
        }}
      >
        <List
          size="small"
          bordered
          dataSource={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={(item) =>
            item === 0 ? (
              <List.Item onClick={start}>开始</List.Item>
            ) : item === 10 ? (
              <List.Item onClick={end}>结束</List.Item>
            ) : (
              <List.Item>
                <Button onClick={() => selectFloor(item)}>{item}</Button>
              </List.Item>
            )
          }
        />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 10,
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            margin: "auto",
            display: "flex",
            width: 300,
            justifyContent: "space-between",
          }}
        >
          <div>智慧校园</div>
          <div>智慧会议室</div>
          <div>智慧物联</div>
        </div>
      </div>
    </>
  );
};

export default GltfSchool;
