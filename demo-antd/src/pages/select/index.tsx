import { Select } from "antd";
import { SyntheticEvent, useState } from "react";
const { Option } = Select;

const SelectDemo = () => {
  const [lazyloadOpts, setLazyloadOpts] = useState<string[]>(() => {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(i.toString(36) + i);
    }
    return children;
  });

  const handleChange = (...rest: any) => {
    // console.log(rest);
  };

  const popupScroll = (e: SyntheticEvent) => {
    const target: HTMLElement = e.target as HTMLElement;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      console.log("load");
      setTimeout(() => {
        setLazyloadOpts((opts: string[]) => {
          const children = [...opts];
          const length = children.length;
          for (let i = length + 10; i < length + 36; i++) {
            var c = i % 36;
            children.push(c.toString(36) + i);
          }
          return children;
        });
      }, 1000);
    }
  };

  return (
    <div>
      <h3>lazy load</h3>
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        onPopupScroll={popupScroll}
        listHeight={100}
      >
        {lazyloadOpts.map((obj: string) => {
          return <Option key={obj}>{obj}</Option>;
        })}
      </Select>
    </div>
  );
};

export default SelectDemo;
