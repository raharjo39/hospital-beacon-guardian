
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import AssetList from "./pages/AssetList";
import PatientList from "./pages/PatientList";
import AlertList from "./pages/AlertList";
import HistoryList from "./pages/HistoryList";
import TimeLogs from "./pages/TimeLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ProtectedRoute>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/assets" element={<AssetList />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/alerts" element={<AlertList />} />
                <Route path="/history" element={<HistoryList />} />
                <Route path="/time-logs" element={<TimeLogs />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ProtectedRoute>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
