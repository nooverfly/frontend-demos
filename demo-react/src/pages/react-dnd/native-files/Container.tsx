import React, { useCallback, useState } from "react";
import TargetBox from "./TargetBox";
import FileList from "./FileList";

const Container = () => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const handleFileDrop = useCallback(
    (item: { files: any[] }) => {
      if (item) {
        const files = item.files;
        setDroppedFiles(files);
      }
    },
    [setDroppedFiles]
  );

  return (
    <>
      <TargetBox onDrop={handleFileDrop} />
      <FileList files={droppedFiles} />
    </>
  );
};

export default Container;
