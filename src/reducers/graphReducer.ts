import { IGraphData } from "../types/tableData";

const initialState: IGraphData[] = [];
const graph = (state = initialState, action) => {
  const updatestate: IGraphData[] = [...state];
  let index;
  switch (action.type) {
    case "UPDATE_GRAPH":
      state = action.payload;
      return state;
    case "UPDATE_GRAPH_VOTE":
      index = updatestate.findIndex((s) => s.id === action.payload.id);

      if (index >= 0) {
        updatestate[index].votes = action.payload.votes + 1;
      }
      state = updatestate;
      return state;
    case "REMOVE_DATA":
      index = updatestate.findIndex((s) => s.id === action.payload.id);

      if (index >= 0) {
        updatestate.splice(index, 1);
      }
      state = updatestate;

      return state;

    default:
      return state;
  }
};
export default graph;
