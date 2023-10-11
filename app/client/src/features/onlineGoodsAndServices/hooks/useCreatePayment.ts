import type { payment, paymentResponse } from 'generated-api-models';
import axios, { AxiosError } from 'axios';
import { API_URL } from 'data/constants';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type CreatePayment = {
  payment: payment;
  merchantId: string;
  requestId: string;
};

export function useCreatePayment(): UseMutationResult<
  paymentResponse,
  AxiosError,
  CreatePayment,
  () => void
> {
  return useMutation(
    ['createPayment'],
    async ({ payment, merchantId, requestId }: CreatePayment) => {
      const response = await axios.post<paymentResponse>(
        `${API_URL}/api/payments`,
        JSON.stringify(payment),
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
