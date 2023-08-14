import type { accountHolder } from 'generated-api-models';

export const accountHolderMock: accountHolder[] = [
    {
        referenceId: "1245",
        fullName: "John Doe",
        email: "john.doe@gmail.com",
        IPAddress: "104.18.127.1",
        billingAddress: {
          line1: "123 main street",
          line2: "Apartment 2",
          city: "Tampa",
          state: "FL",
          postalCode: "33785"
        }
      },
] as accountHolder[];
