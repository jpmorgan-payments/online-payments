import type {  accountHolder, } from 'generated-api-models';
import { accountHolderMock } from 'mocks';


//TODO for now lets hardcode payment example data
export function useAccountHolder():
  accountHolder[]
 {
  return accountHolderMock
}