import { useRequest } from "ahooks";

const getData = (url: string, data?: any) => {
  return () => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((resp) => resp.json())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };
};

const UseRequestDemo = () => {
  // 自动
  /* const { data, error, loading }: any = useRequest(
    getData("https://httpbin.org/get?id=123")
  );

  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return <div>Username:{data.args.id}</div>; */

  // 手动
  const { run, loading, data, error }: any = useRequest(
    getData("https://httpbin.org/get?id=123"),
    {
      manual: true,
    }
  );

  return (
    <div>
      <button onClick={run}>getData</button>
      {error ? (
        <div>failed to loa</div>
      ) : loading ? (
        <div>loading</div>
      ) : data ? (
        <div>Username:{data.args.id}</div>
      ) : null}
    </div>
  );
};

export default UseRequestDemo;
