export interface ITask {
  id: string;
  title: string;
  userId: string;
  isDone: boolean;
  createdAt: number;
}

export interface IApiResponse<T> {
  first: number;
  prev: null | number;
  next: null | number;
  last: number;
  pages: number;
  items: number;
  data: Array<T>;
}
