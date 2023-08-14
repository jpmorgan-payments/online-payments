import type {  accountHolder, shipTo, } from 'generated-api-models';
import { accountHolderMock } from 'mocks';
import { shipToMock } from 'mocks/shipTo.mock';


//TODO for now lets hardcode payment example data
export function useShipTo():
  shipTo[]
 {
  return shipToMock
}