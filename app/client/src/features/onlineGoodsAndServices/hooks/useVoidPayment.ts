import type {
  paymentPatch,
  paymentResponse,
  transactionId,
} from 'generated-api-models';
import axios, { AxiosError } from 'axios';
import { API_URL } from 'data/constants';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type VoidPayment = {
  voidRequest: paymentPatch;
  merchantId: string;
  requestId: string;
  transactionId: transactionId;
};

export function useVoidPayment(): UseMutationResult<
  paymentResponse,
  AxiosError,
  VoidPayment,
  () => void
> {
  return useMutation(
    ['voidPayment'],
    async ({
      voidRequest,
      merchantId,
      requestId,
      transactionId,
    }: VoidPayment) => {
      const response = await axios.patch<paymentResponse>(
        `${API_URL}/api/payments/${transactionId}`,
        JSON.stringify(voidRequest),
        {
          headers: {
            'merchant-id': merchantId,
            'request-id': requestId,
          },
        },
      );

      return response.data;
    },
  );
}
