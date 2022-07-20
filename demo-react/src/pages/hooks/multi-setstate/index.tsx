import { Radio } from "antd";
import { useReducer } from "react";

interface IData {
  title: string;
  text: string;
  open: boolean;
}
type Action =
  | {
      type: 0;
    }
  | {
      type: 11;
    }
  | {
      type: 4;
    };

function reducer(state: IData, action: Action) {
  switch (action.type) {
    case 11:
      return {
        title: "新闻联播",
        text: "《新闻联播》是中国中央电视台每日晚间播出的一档新闻节目，被称为“中国政坛的风向标”，节目宗旨为“宣传党和政府的声音，传播天下大事”。",
        open: true,
      };
    case 4:
      return {
        title: "共同关注",
        text: "《共同关注》是CCTV-13新闻频道一档以公益慈善为品牌特色的日播专题栏目",
        open: true,
      };
    case 0:
      return {
        title: "",
        text: "",
        open: false,
      };
  }
}

export default function MultiSetState() {
  const [data, dispatch] = useReducer(reducer, {
    title: "",
    text: "",
    open: false,
  });

  return (
    <div>
      <Radio.Group defaultValue={0} onChange={(e) => dispatch({ type: e.target.value })}>
        <Radio value={0}>关闭</Radio>
        <Radio value={11}>CCTV11</Radio>
        <Radio value={4}>CCTV4</Radio>
      </Radio.Group>
      <h2>电源：{data?.open ? "开" : "关"}</h2>
      <h3>{data?.title}</h3>
      <h4>{data?.text}</h4>
    </div>
  );
}
