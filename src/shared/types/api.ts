export type DefaultResponse<T, S = null> = {
  data: T | null;
  meta: S | null;
  status: 'success' | 'error' | null;
  error: DefaultResponseError | null;
};

export type DefaultResponseError = {
  title: string;
  message: string;
  details: { field: string; value: string; code?: number }[];
  code?: number;
};
