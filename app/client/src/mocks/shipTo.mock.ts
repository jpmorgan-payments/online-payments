import type { shipTo } from 'generated-api-models';

export const shipToMock: shipTo[] = [
  {
    shippingAddress: {
      line1: "123 main street",
      line2: "Apartment 2",
      city: "Tampa",
      state: "FL",
      postalCode: "33785"
    }
  },
] as shipTo[];
