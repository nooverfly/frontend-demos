import React from "react";
import { useMount } from "@/utils/hooks";
import { fromPairs } from "lodash";

const ArrayFromPairs = () => {
  useMount(() => {
    const arr = [
      ["Tiga", 44000, 53],
      ["Nexus", 40000, 49],
    ];

    console.log(fromPairs(arr));
  });

  return (
    <div>
      <h2>_.fromPairs(pairs)</h2>
      <p>返回一个由键值对pairs构成的对象。</p>
    </div>
  );
};

export default ArrayFromPairs;
