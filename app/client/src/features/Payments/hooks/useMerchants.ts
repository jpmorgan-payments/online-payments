import { useQuery, UseQueryResult } from '@tanstack/react-query';

import type { merchant } from 'generated-api-models';
import { merchantMock } from 'mocks/merchants.mock';
//TODO for now lets hardcode merchant example data
export function useMerchants():
  merchant[]
 {
  return merchantMock
}