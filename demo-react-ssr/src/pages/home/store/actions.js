import axios from "axios";
import { CHANGE_LIST } from "./constants";

const changeList = (list) => ({
  type: CHANGE_LIST,
  list,
});

export const getHomeList = () => {
  return (dispatch) => {
    return axios.get("http://localhost:13000/get-list").then((res) => {
      const list = res.data.result;
      console.log(list);
      dispatch(changeList(list));
    });
  };
};
