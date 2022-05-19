import React, { Component } from "react";
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

class Home extends Component {
  getList() {
    const { list } = this.props;
    return list.map((item) => <div key={item.id}>{item.name}</div>);
  }

  render() {
    return (
      <div>
        <Header />
        {this.getList()}
        <button
          onClick={() => {
            alert("click1");
          }}
        >
          click
        </button>
      </div>
    );
  }

  componentDidMount() {
    this.props.getHomeList();
  }
}
const mapStateToProps = (state) => ({
  list: state.home.newsList,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeList() {
    dispatch(getHomeList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
