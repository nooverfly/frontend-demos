import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { getHomeList } from "./store/actions";

/* const Home = () => {
  return (
    <div>
      This is Home
      <button onClick={() => alert("clicked")}>click</button>
    </div>
  );
}; */
const Home = ({ list = [], getHomeList }) => {
  const getList = () => {
    return list.map((item) => <div key={item.id}>{item.name}</div>);
  };

  /* useEffect(() => {
    getHomeList();
  }, []); */

  return (
    <div>
      <Header />
      {getList()}
      <button
        onClick={() => {
          alert("click1");
        }}
      >
        click
      </button>
    </div>
  );
};

Home.loadData = (store) => {
  // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
  return store.dispatch(getHomeList());
};

const mapStateToProps = (state) => ({
  list: state.home.newsList,
});

/* const mapDispatchToProps = (dispatch) => ({
  getHomeList() {
    dispatch(getHomeList());
  },
}); */

export default connect(mapStateToProps /* , mapDispatchToProps */)(Home);
