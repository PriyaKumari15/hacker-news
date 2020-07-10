// import { IHits } from "../tableData";
export const updateNewsList = (news) => {
  return {
    type: "UPDATE_LIST",
    payload: news,
  };
};
export const updateVote = (news) => {
  return {
    type: "UPDATE_VOTE",
    payload: news,
  };
};
export const removeNews = (news) => {
  return {
    type: "REMOVE_NEWS",
    payload: news,
  };
};
