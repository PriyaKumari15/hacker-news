export interface ITableData {
  hits: IHits;
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  query: string;
  params: string;
}

export interface IHits {
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: string;
  comment_text: string;
  created_at: string;
  _tags: string[];
  num_comments: number;
  objectID: string;
  _highlightResult: IHighlightResult;
}

export interface IHighlightResult {
  title: IResult;
  url: IResult;
  author: IResult;
}

export interface IGraphData {
  votes: number;
  id: string;
}

export interface IResult {
  value: string;
  matchLevel: string;
  matchWords: string[];
}

export interface IPage {
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
}
