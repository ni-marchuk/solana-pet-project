import type { Token } from '@entities/token/types.ts';
import type { DefaultResponse } from '@shared/types/api.ts';
import { createEmptyResponse } from '@shared/helpers/createEmptyResponse.ts';
import { createEmptyError } from '@shared/helpers/createEmptyError.ts';

export type GetTokenListResponse = Record<string, Token>;

export const getTokenList = async (): Promise<DefaultResponse<GetTokenListResponse>> => {
  const emptyResponse = createEmptyResponse<GetTokenListResponse>();
  const emptyError = createEmptyError();
  try {
    const response = await fetch('https://launch.meme/api/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 1, version: 1 }),
    });
    if (response.ok) {
      const data: { tokens: GetTokenListResponse } = await response.json();
      return {
        ...emptyResponse,
        data: data.tokens,
      };
    } else {
      return {
        ...emptyResponse,
        status: 'error',
        error: {
          ...emptyError,
          message: `Failed fetch - status: ${response.status}`,
        },
      };
    }
  } catch (e) {
    return {
      ...emptyResponse,
      status: 'error',
      error: {
        ...emptyError,
        message: e instanceof Error ? e.message : 'Server error',
      },
    };
  }
};

export type GetMintTokenMetadataResponse = {
  name: string
  symbol: string
  description: string
  image: string
  createdOn: string
  website: string
  twitter: string
  telegram: string
}

export const getMintTokenMetadata = async (metadataUri: string): Promise<DefaultResponse<GetMintTokenMetadataResponse>> => {
  const emptyResponse = createEmptyResponse<GetMintTokenMetadataResponse>();
  const emptyError = createEmptyError();
  try {
    const response = await fetch(metadataUri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data: GetMintTokenMetadataResponse = await response.json();
      return {
        ...emptyResponse,
        data: data,
      };
    } else {
      return {
        ...emptyResponse,
        status: 'error',
        error: {
          ...emptyError,
          message: `Failed fetch - status: ${response.status}`,
        },
      };
    }
  } catch (e) {
    return {
      ...emptyResponse,
      status: 'error',
      error: {
        ...emptyError,
        message: e instanceof Error ? e.message : 'Server error',
      },
    };
  }
};
