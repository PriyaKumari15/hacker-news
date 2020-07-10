import { IHits } from "../types/tableData";

const initialState: IHits[] = [];
const news = (state = initialState, action) => {
  const updatestate: IHits[] = [...state];
  let index;
  switch (action.type) {
    case "UPDATE_LIST":
      state = action.payload;
      return state;
    case "UPDATE_VOTE":
      index = updatestate.findIndex(
        (s) => s.objectID === action.payload.objectID
      );

      if (index >= 0) {
        updatestate[index].points = action.payload.points + 1;
      }
      state = updatestate;
      return state;
    case "REMOVE_NEWS":
      index = updatestate.findIndex(
        (s) => s.objectID === action.payload.objectID
      );

      if (index >= 0) {
        updatestate.splice(index, 1);
      }
      state = updatestate;
      return state;
    default:
      return state;
  }
};
export default news;
