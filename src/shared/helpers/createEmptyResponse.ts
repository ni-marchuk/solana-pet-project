import type { DefaultResponse } from '@shared/types/api.ts';

export const createEmptyResponse = <T, S = null>(): DefaultResponse<T, S> => ({
  data: null,
  meta: null,
  status: null,
  error: null,
});
