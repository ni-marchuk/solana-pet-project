import type { DefaultResponseError } from '@shared/types/api.ts';

export const createEmptyError = (): DefaultResponseError => ({
  title: 'Ошибка',
  message: '',
  details: [],
});
