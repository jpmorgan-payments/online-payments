import type {
  captureRequest,
  multiCapture,
  paymentResponse,
  transactionId,
} from 'generated-api-models';
import axios, { AxiosError } from 'axios';
import { API_URL } from 'data/constants';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type CapturePayment = {
  capture: captureRequest;
  merchantId: string;
  requestId: string;
  transactionId: transactionId;
  multiCaptureSequenceNumber?: number;
};

const handleMultiCapture = (
  multiCaptureSequenceNumber: number,
  multiCapture: multiCapture,
) => {
  //Set multi capture number and increase by one as we have zero indexed it
  multiCapture.multiCaptureSequenceNumber = (
    multiCaptureSequenceNumber + 1
  ).toString();
  if (
    multiCapture.multiCaptureSequenceNumber ===
    multiCapture.multiCaptureRecordCount?.toString()
  ) {
    multiCapture.isFinalCapture = true;
  }
  return multiCapture;
};

export function useCapturePayment(): UseMutationResult<
  paymentResponse,
  AxiosError,
  CapturePayment,
  () => void
> {
  return useMutation(
    ['capturePayment'],
    async ({
      capture,
      merchantId,
      requestId,
      transactionId,
      multiCaptureSequenceNumber,
    }: CapturePayment) => {
      if (multiCaptureSequenceNumber && capture.multiCapture) {
        capture.multiCapture = handleMultiCapture(
          multiCaptureSequenceNumber,
          capture.multiCapture,
        );
      }
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
