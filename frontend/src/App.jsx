import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
/* ---------------- PUBLIC ---------------- */
import Landing from "./page/Landing";

const Support = lazy(() => import("./page/Support"));
const SupportBlog = lazy(() => import("./components/Landing/SupportBlog"));
const Signin = lazy(() => import("./page/Signin"));
const Signup = lazy(() => import("./page/Signup"));
const ForgotEmail = lazy(() => import("./page/ForgotEmail"));
const SendOtp = lazy(() => import("./page/SendOtp"));
const ResetPassword = lazy(() => import("./page/Resetpassword"));
const Checkout = lazy(() => import("./components/payment/Checkout"));

/* ---------------- DASHBOARDS ---------------- */
const AdminDashboard = lazy(() => import("./page/AdminDashboard"));
const WorkerDashboard = lazy(() => import("./page/WorkerDashboard"));
const VetDashboard = lazy(() => import("./page/VetDashboard"));

/* ---------------- LAYOUT ---------------- */
const DashboardLayout = lazy(() => import("./layout/DashboardLayout"));

/* ---------------- GUARDS ---------------- */
const RoleRoute = lazy(() => import("./components/RoleRoute"));
const PublicRoute = lazy(() => import("./components/PublicRoute"));

/* ---------------- ADMIN ---------------- */
const Animals = lazy(() => import("./components/Animals"));
const AdminUsers = lazy(() => import("./page/AdminUsers"));
const FinancialOverview = lazy(() => import("./components/FinancialOverview"));
const Financials = lazy(() => import("./components/Financial"));
const Inventory = lazy(() => import("./components/inventory/Inventory"));
const InventoryUsage = lazy(() =>
  import("./components/inventory/InventoryUsage")
);

/* ---------------- SHARED ---------------- */
const FeedingOverview = lazy(() => import("./components/FeedingOverview"));
const FeedingLogs = lazy(() => import("./components/FeedingLogs"));
const HealthOverview = lazy(() => import("./components/HealthOverview"));
const AnimalHealth = lazy(() => import("./components/animals/AnimalHealth"));
const Profile = lazy(() => import("./page/Profile"));

/* ---------------- WORKER ---------------- */
const WorkerAnimals = lazy(() => import("./page/WorkerAnimals"));
const WorkerLayout = lazy(() => import("./page/WorkerLayout"));

/* ---------------- VET ---------------- */
const VetAnimals = lazy(() => import("./page/VetAnimals"));

// Loading Spinner for lazy chunks
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-black">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
  </div>
);
const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ===================================================== */}
        {/* ===================== PUBLIC ======================== */}
        {/* ===================================================== */}
        <Route path="/" element={<Landing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support/:supportname" element={<SupportBlog />} />
        <Route path="/checkout" element={<Checkout />} />
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
    </Suspense>
  );
};

export default App;
