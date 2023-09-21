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
                <Route
                  path="onlineGoodsServices"
                  element={<OnlineGoodsAndServicesPage />}
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
