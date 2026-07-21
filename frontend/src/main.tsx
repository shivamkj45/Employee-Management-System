import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import theme from "./theme/theme";
import queryClient from "./services/queryClient";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>

            <App />

          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </ThemeProvider>
  </StrictMode>
);