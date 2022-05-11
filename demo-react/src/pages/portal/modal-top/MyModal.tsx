import ReactDOM from "react-dom";

const MyModal = (props: any) => {
  const { width, height, top, left, visible } = props;
  return ReactDOM.createPortal(
    <div
      style={{
        width,
        height,
        position: "absolute",
        top,
        left,
        display: visible ? "block" : "none",
        background: "#2DD9FF",
        zIndex: 9999,
      }}
    >
      modal
    </div>,
    document.body
  );
  /* return (
    <div
      style={{
        width,
        height,
        position: "absolute",
        top,
        left,
        display: visible ? "block" : "none",
        background: "#2DD9FF",
        zIndex: 9999,
      }}
    >
      modal
    </div>
  ); */
};

export default MyModal;
