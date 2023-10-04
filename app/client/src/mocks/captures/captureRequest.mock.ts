import type { captureRequest } from 'generated-api-models';

export const captureRequestFullMock: captureRequest = {
  captureMethod: 'NOW',
} as captureRequest;

export const captureRequestPartialMock: captureRequest = {
  captureMethod: 'NOW',
  amount: 10,
} as captureRequest;
