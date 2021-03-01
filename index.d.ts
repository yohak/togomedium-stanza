type SimpleObject = { [key: string]: string | number };

type ApiResponse<T> = {
  status: number;
  message?: string;
  body: T;
};
