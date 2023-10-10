import type { refund, refundResponse } from 'generated-api-models';
import axios, { AxiosError } from 'axios';
import { API_URL } from 'data/constants';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type RefundPaymentProps = {
  refund: refund;
  merchantId: string;
  requestId: string;
};

export function useRefundPayment(): UseMutationResult<
  refundResponse,
  AxiosError,
  RefundPaymentProps,
  () => void
> {
  return useMutation(
    ['refundPayment'],
    async ({ refund, merchantId, requestId }: RefundPaymentProps) => {
      const response = await axios.post<refundResponse>(
        `${API_URL}/api/refunds`,
        JSON.stringify(refund),
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
