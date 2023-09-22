import axios from 'axios';
import { API_URL } from 'data/constants';
import type { paymentResponse } from 'generated-api-models';

export const useGetPayment = async (
  transactionId: string,
): Promise<paymentResponse> => {
  const response = await axios.get<paymentResponse>(
    `${API_URL}/api/payments/${transactionId}`,
  );
  return response.data;
};
