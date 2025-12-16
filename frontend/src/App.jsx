import React from "react";
import { Routes, Route } from "react-router-dom";

/* ---------------- PUBLIC ---------------- */
import Landing from "./page/Landing";
import Support from "./page/Support";
import SupportBlog from "./components/Landing/SupportBlog";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import ForgotEmail from "./page/ForgotEmail";
import SendOtp from "./page/SendOtp";
import ResetPassword from "./page/Resetpassword";

/* ---------------- DASHBOARDS ---------------- */
import AdminDashboard from "./page/AdminDashboard";
import WorkerDashboard from "./page/WorkerDashboard";
import VetDashboard from "./page/VetDashboard";

/* ---------------- LAYOUT ---------------- */
import DashboardLayout from "./layout/DashboardLayout";

/* ---------------- GUARDS ---------------- */
import RoleRoute from "./components/RoleRoute";
import PublicRoute from "./components/PublicRoute";

/* ---------------- ADMIN ---------------- */
import Animals from "./components/Animals";
import AdminUsers from "./page/AdminUsers";
import FinancialOverview from "./components/FinancialOverview";
import Financials from "./components/Financial";
import Inventory from "./components/inventory/Inventory";
import InventoryUsage from "./components/inventory/InventoryUsage";

/* ---------------- SHARED ---------------- */
import FeedingOverview from "./components/FeedingOverview";
import FeedingLogs from "./components/FeedingLogs";
import HealthOverview from "./components/HealthOverview";
import AnimalHealth from "./components/animals/AnimalHealth";
import Profile from "./page/Profile";

/* ---------------- WORKER ---------------- */
import WorkerAnimals from "./page/WorkerAnimals";
import WorkerLayout from "./page/WorkerLayout";

/* ---------------- VET ---------------- */
import VetAnimals from "./page/VetAnimals";

const App = () => {
  return (
    <Routes>
      {/* ===================================================== */}
      {/* ===================== PUBLIC ======================== */}
      {/* ===================================================== */}
      <Route path="/" element={<Landing />} />
      <Route path="/support" element={<Support />} />
      <Route path="/support/:supportname" element={<SupportBlog />} />

      <Route
        path="/signin"
        element={
          <PublicRoute>
            <Signin />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotEmail />
          </PublicRoute>
        }
      />
      <Route
        path="/send-otp"
        element={
          <PublicRoute>
            <SendOtp />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/* ===================================================== */}
      {/* ===================== ADMIN ========================= */}
      {/* ===================================================== */}
      <Route
        path="/admin"
        element={
          <RoleRoute role="ADMIN">
            <DashboardLayout />
          </RoleRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="animals" element={<Animals />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="feeding" element={<FeedingOverview />} />
        <Route path="health" element={<HealthOverview />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/:itemId/usage" element={<InventoryUsage />} />
        <Route path="financials" element={<FinancialOverview />} />
        <Route path="financials/transactions" element={<Financials />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ===================================================== */}
      {/* ===================== WORKER ======================== */}
      {/* ===================================================== */}
      <Route
        path="/worker"
        element={
          <RoleRoute role="WORKER">
            <DashboardLayout />
          </RoleRoute>
        }
      >
        <Route index element={<WorkerDashboard />} />
        <Route path="health" element={<HealthOverview />} />
        <Route path="animals" element={<WorkerAnimals />} />
        <Route path="feeding" element={<FeedingOverview />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ---------------- VET ROUTES ---------------- */}
      <Route
        path="/vet"
        element={
          <RoleRoute role="VET">
            <DashboardLayout />
          </RoleRoute>
        }
      >
        <Route index element={<VetDashboard />} />
        <Route path="health" element={<HealthOverview />} />
        <Route path="animals" element={<VetAnimals />} />
        <Route path="animals/:animalId/health" element={<AnimalHealth />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ===================================================== */}
      {/* ===================== SHARED ======================== */}
      {/* ===================================================== */}
      <Route
        path="/animals/:animalId/feeding"
        element={
          <RoleRoute role={["ADMIN", "WORKER"]}>
            <DashboardLayout />
          </RoleRoute>
        }
      >
        <Route index element={<FeedingLogs />} />
      </Route>

      <Route
        path="/animals/:animalId/health"
        element={
          <RoleRoute role={["ADMIN", "VET"]}>
            <DashboardLayout />
          </RoleRoute>
        }
      >
        <Route index element={<AnimalHealth />} />
      </Route>

      {/* ===================================================== */}
      {/* ===================== FALLBACK ====================== */}
      {/* ===================================================== */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
