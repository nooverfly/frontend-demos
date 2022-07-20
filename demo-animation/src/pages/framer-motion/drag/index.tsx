import React, { useRef } from "react";
import { motion } from "framer-motion";
import style from "./style.module.css";

const FramerMotionDrag = () => {
  const constraintsRef = useRef(null);

  return (
    <div className={`${style["framer-motion-root"]} full-content`}>
      <div className={style["example-container"]}>
        <motion.div
          className={style["drag-area"]}
          ref={constraintsRef}
        ></motion.div>
        <motion.div drag dragConstraints={constraintsRef}></motion.div>
      </div>
    </div>
  );
};

export default FramerMotionDrag;
