import React, { useEffect, useRef } from "react";
import { PivotSheet } from "@antv/s2";

const BasicTreeMode = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/2a5dbbc8-d0a7-4d02-b7c9-34f6ca63cff6.json"
    )
      .then((res) => res.json())
      .then((dataCfg) => {
        const s2Options: any = {
          width: 600,
          height: 480,
          hierarchyType: "tree",
          style: {
            collapsedRows: {
              "root[&]浙江省": true, // 折叠浙江省下面所有的城市
            },
          },
        };
        const s2 = new PivotSheet(divRef.current!, dataCfg, s2Options);

        s2.render();
      });
  }, []);

  return <div className="full-content" ref={divRef}></div>;
};

export default BasicTreeMode;
