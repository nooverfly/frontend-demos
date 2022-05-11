import { useEffect, useState } from "react";
import List from "./List";
import MyTable from "./Table";
import withLoading from "./withLoading";
const HOCList = withLoading(List);
const HOCTable = withLoading(MyTable);

const LoadHOC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsTableLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <HOCList isLoading={isLoading} />
      <HOCTable isLoading={isTableLoading} />
    </div>
  );
};

export default LoadHOC;
