import React, { Suspense } from "react";

const LazyDemo = React.lazy(() => import("./LazyDemo"));

const ReactLazy = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <LazyDemo />
    </Suspense>
  );
};

export default ReactLazy;
