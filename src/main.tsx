import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import Landing from './pages/landing/Landing';
import LoginPage from './pages/login/LoginPage';
import ResourceListPage from './pages/resources/ResourceListPage';
import ResourceDetailPage from './pages/resources/ResourceDetailPage';
import { PrivateRouteWrapper } from './routes/PrivateRoute';



const routes = [
  {
    path: '/',
    element: <App />, 
    children: [
      {
        index: true, // Same as path: '/'
        element: <Landing />,
      },
      { path: 'resources', element: <PrivateRouteWrapper element={<ResourceListPage />} /> },
      { path: 'resources/:id', element: <PrivateRouteWrapper element={<ResourceDetailPage />} /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />, 
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
