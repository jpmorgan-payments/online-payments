export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const GITHUB_REPO =
  'https://github.com/jpmorgan-payments/online-payments';


  export const MERCHANT_ID = '998482157632';

  export const MERCHANT = {
    merchantSoftware: {
      companyName: 'Payment Company',
      productName: 'Application Name',
      version: '1.235',
    },
    merchantCategoryCode: '4899',
  }

  export const PAYMENTS_AUTHORISE_API = "https://www.jpmorgan.com/payments";
  export const PAYMENTS_GET_TRANSACTION_API = "https://www.jpmorgan.com/payments";
  export const PAYMENTS_CAPTURE_API = "https://www.jpmorgan.com/payments";
  export const PAYMENTS_REFUND_API = "https://www.jpmorgan.com/payments";
  export const ONLINE_PAYMENTS_DOC_HOME = "https://www.jpmorgan.com/payments";
  export const PAYMENTS_VOID_API = "https://www.jpmorgan.com/payments";