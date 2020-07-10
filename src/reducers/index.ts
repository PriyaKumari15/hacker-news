import news from "./newsReducer";
import graph from "./graphReducer";
import { combineReducers } from "redux";

export default combineReducers({
  news,
  graph,
});
