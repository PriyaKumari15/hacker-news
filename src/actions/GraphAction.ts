import { IGraphData } from "../types/tableData";
export const updateGraph = (graph: IGraphData[]) => {
  return {
    type: "UPDATE_GRAPH",
    payload: graph,
  };
};
export const updateVoteGraph = (graph: IGraphData[]) => {
  return {
    type: "UPDATE_GRAPH_VOTE",
    payload: graph,
  };
};
export const removeData = (graph: IGraphData) => {
  return {
    type: "REMOVE_DATA",
    payload: graph,
  };
};
