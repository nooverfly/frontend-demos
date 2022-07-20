import { CHANGE_LIST } from "./constants";

const defaultState = {
  newsList: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case CHANGE_LIST:
      return {
        ...state,
        newsList: action.list,
      };
    default:
      return state;
  }
}
