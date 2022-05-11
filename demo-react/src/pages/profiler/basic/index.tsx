import { Profiler, useState } from "react";

const ProfilerBasic = () => {
  const [formObj, setFormObj] = useState({
    name: "",
    pwd: "",
  });

  const changeName = (e: any) => {
    const val = e.target.value;
    setFormObj({
      ...formObj,
      name: val,
    });
  };

  const changePwd = (e: any) => {
    const val = e.target.value;
    setFormObj({
      ...formObj,
      pwd: val,
    });
  };

  const onRender = (
    id: string, // 发生提交的 Profiler 树的 “id”
    phase: string, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration: number, // 本次更新 committed 花费的渲染时间
    baseDuration: number, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime: number, // 本次更新中 React 开始渲染的时间
    commitTime: number, // 本次更新中 React committed 的时间
    interactions: any // 属于本次更新的 interactions 的集合
  ) => {
    console.log(
      id, // 发生提交的 Profiler 树的 “id”
      phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
      actualDuration, // 本次更新 committed 花费的渲染时间
      baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
      startTime, // 本次更新中 React 开始渲染的时间
      commitTime, // 本次更新中 React committed 的时间
      interactions // 属于本次更新的 interactions 的集合)
    );
  };

  return (
    <div>
      <Profiler id="basic" onRender={onRender}>
        <form>
          <div>
            <label>用户名：</label>
            <input value={formObj.name} onChange={changeName} />
          </div>
          <div>
            <label>密码：</label>
            <input type="password" value={formObj.pwd} onChange={changePwd} />
          </div>
          <div>
            <button>提交</button>
          </div>
        </form>
      </Profiler>
    </div>
  );
};

export default ProfilerBasic;
