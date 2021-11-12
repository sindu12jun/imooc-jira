import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};
