import useSWR from "swr";
import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";

const fetcher = (...args: any) =>
  // @ts-ignore
  fetch(...args).then((resp) => resp.json());

const Child = () => {
  const { data, error } = useSWR("https://httpbin.org/get?id=123", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading</div>;
  return <div>hello, {data.args.id}</div>;
};

const DataCompare = ({ data }: any) => {
  const node = useRef<HTMLDivElement>(null);
  const chart = useRef<any>(null);

  useEffect(() => {
    if (node.current) {
      if (chart.current) {
        chart.current.dispose();
      }

      const bar = echarts.init(node.current);
      const xArr: any = [];
      const yArr: any = [];
      data.forEach((obj: any) => {
        xArr.push(obj.x);
        yArr.push(obj.y);
      });
      const options = {
        xAxis: {
          type: "category",
          data: xArr,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: yArr,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };

      bar.setOption(options);
      chart.current = bar;
    }
  }, [JSON.stringify(data)]);

  return <div style={{ width: 400, height: 300 }} ref={node} />;
};

const SWRDemo = () => {
  // const { data, error } = useSWR("http://127.0.0.1:5500/data.json", fetcher, {
  //   refreshInterval: 5000,
  // });
  const [data, setData] = useState<any>(null);

  const req = () => {
    fetch("http://127.0.0.1:5500/data.json")
      .then((resp) => resp.json())
      .then((result) => setData(result));
  };
  useEffect(() => {
    let timer = setInterval(() => {
      req();
    }, 3000);
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return (
    <div>
      <Child />
      <Child />
      <Child />
      {data ? <DataCompare data={data.data} /> : <div>loading...</div>}
    </div>
  );
};

export default SWRDemo;
