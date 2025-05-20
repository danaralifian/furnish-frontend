export type Pagination = {
  totalData?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
};

export type Error = {
  message: string[];
  error?: number;
};

export type ApiResponse<T> = {
  statusCode?: number;
  data?: T;
  error?: Error;
  pagination?: Pagination | null;
};

export type Delete = {
  message?: string;
};
