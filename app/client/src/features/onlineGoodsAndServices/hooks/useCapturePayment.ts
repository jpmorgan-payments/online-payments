import type {
  captureRequest,
  payment,
  paymentResponse,
  transactionId,
} from 'generated-api-models';
import axios, { AxiosError } from 'axios';
import { API_URL } from 'data/constants';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type capturePayment = {
  capture: captureRequest;
  merchantId: string;
  requestId: string;
  transactionId: transactionId;
};

export function useCapturePayment(): UseMutationResult<
  paymentResponse,
  AxiosError,
  capturePayment,
  () => void
> {
  return useMutation(
    ['createPayment'],
    async ({
      capture,
      merchantId,
      requestId,
      transactionId,
    }: capturePayment) => {
      const response = await axios.post<paymentResponse>(
        `${API_URL}/api/payments/${transactionId}/captures`,
        JSON.stringify(capture),
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
