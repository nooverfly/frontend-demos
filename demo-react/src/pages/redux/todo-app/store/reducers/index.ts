import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todo";

export default combineReducers({
  todos,
  visibilityFilter,
});
