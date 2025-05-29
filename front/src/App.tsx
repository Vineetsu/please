import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DonationsProvider } from "./contexts/DonationsContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Donations from "./pages/Donations";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import DonationDetail from "./pages/DonationDetail";
import Register from "./pages/Register";
import CreateDonation from "./pages/CreateDonation";
import AdminUsers from "./pages/admin/Users";
import AdminReports from "./pages/admin/Reports";
import ProfileEdit from "./pages/profile/Edit";
import ProfilePreferences from "./pages/profile/Preferences";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DonationsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/donations/:id" element={<DonationDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-donation" element={<CreateDonation />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/profile/preferences" element={<ProfilePreferences />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DonationsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
