import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Layout } from 'components';
import {
  NotFoundErrorPage,
  OverviewPage,
  OnlineGoodsAndServicesPage,
} from 'pages';

import { themes } from 'themes';
import { paymentAuthorizeResponseListMock } from 'mocks/paymentAuthorizeResponseList.mock';
import { paymentResponse } from 'generated-api-models';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const App = () => {
  const previousTransactionsMock: paymentResponse[] =
    paymentAuthorizeResponseListMock;

  const initialTransactionIds = previousTransactionsMock.map(
    (transaction) => transaction.transactionId,
  );
  const [themeName, setThemeName] = useState<string>(Object.keys(themes)[0]);
  const [transactionIds, setTransactionIds] = useState<string[]>(
    initialTransactionIds,
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={themes[themeName]}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <BrowserRouter>
            <Layout
              themeProps={{
                currentThemeName: themeName,
                themeNames: Object.keys(themes),
                setThemeName: setThemeName,
              }}
            >
              <Routes>
                <Route path="*" element={<NotFoundErrorPage />} />
                <Route path="overview" element={<OverviewPage />} />
                <Route
                  path="onlineGoodsServices"
                  element={
                    <OnlineGoodsAndServicesPage
                      transactionIds={transactionIds}
                      setTransactionIds={setTransactionIds}
                    />
                  }
                />
                <Route path="/" element={<Navigate replace to="/overview" />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
