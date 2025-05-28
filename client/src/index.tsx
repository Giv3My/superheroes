import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
        style: {
          color: '#fff',
          backgroundColor: '#333',
        },
      }}
    />
  </>
);
