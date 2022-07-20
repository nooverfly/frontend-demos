import { useContext, useEffect, useState } from "react";
import GrayContext from "./context";
import grayState from "./grayState";

const GrayCom = () => {
  console.log("GrayComponent rerender");
  const grayState: any = useContext(GrayContext);

  return (
    <div>
      子节点
      {grayState.gray && <div>灰度字段</div>}
    </div>
  );
};

const GrayComponent = () => {
  console.log("GrayComponent rerender");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const change = (status: any) => {
      setVisible(status.gray);
    };

    grayState.attach(change);
    return () => {
      grayState.detach(change);
    };
  }, []);

  return (
    <div>
      子节点
      {visible && <div>灰度字段</div>}
    </div>
  );
};

const OtherChild = () => {
  console.log("OtherChild rerender");
  return <div>其它子节点</div>;
};

const UseContextOpt = () => {
  console.log("App rerender");
  const [globalStatus, setGlobalStatus] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setGlobalStatus({ gray: true });
    }, 2000);
  }, []);

  return (
    <GrayContext.Provider value={globalStatus}>
      <GrayCom />
      <OtherChild />
    </GrayContext.Provider>
  );
};

const CustomContextOpt = () => {
  console.log("App rerender");

  useEffect(() => {
    console.log("Get GrayState");
    setTimeout(() => {
      const nextStatus = {
        gray: true,
      };
      grayState.updateStatus(nextStatus);
    }, 2000);
  }, []);

  return (
    <div>
      <GrayComponent />
      <OtherChild />
    </div>
  );
};

// export default UseContextOpt;
export default CustomContextOpt;
