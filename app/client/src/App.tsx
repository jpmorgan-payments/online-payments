import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { Layout } from 'components';
import {
  NotFoundErrorPage,
  OverviewPage,
  PaymentsPage,
} from 'pages';

import { themes } from 'themes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const App = () => {
  const [themeName, setThemeName] = useState<string>(Object.keys(themes)[0]);

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
                <Route path="payments" element={<PaymentsPage />} />
                <Route path="/" element={<Navigate replace to="/overview" />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
