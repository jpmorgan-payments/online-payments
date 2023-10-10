import type { merchant } from 'generated-api-models';

export const merchantMock: merchant[] = [
  {
    merchantId: '998482157632',
    merchantSoftware: {
      companyName: 'Payment Company',
      productName: 'Application Name',
      version: '1.235',
    },
    merchantCategoryCode: '4899',
  },
  {
    merchantId: '9984821576321',
    merchantSoftware: {
      companyName: 'Payment Company2',
      productName: 'Application Name',
      version: '1.2353',
    },
    merchantCategoryCode: '4899',
  },
] as merchant[];
