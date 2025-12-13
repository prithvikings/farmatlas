import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./page/Landing";
import Support from "./page/Support";
import SupportBlog from "./components/Landing/SupportBlog";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import ForgotEmail from "./page/ForgotEmail";
import SendOtp from "./page/SendOtp";
import ResetPassword from "./page/Resetpassword";

import AdminDashboard from "./page/AdminDashboard";
import WorkerDashboard from "./page/WorkerDashboard";
import VetDashboard from "./page/VetDashboard";

import RoleRoute from "./components/RoleRoute";
import PublicRoute from "./components/PublicRoute";
import Animals from "./components/Animals";
import AdminUsers from "./page/AdminUsers";
import FeedingLogs from "./components/FeedingLogs";
import FeedingOverview from "./components/FeedingOverview";
import HealthOverview from "./components/HealthOverview";
import AnimalHealthTimeline from "./components/AnimalHealthTimeline";
import AnimalHealth from "./components/animals/AnimalHealth";
import Inventory from "./components/inventory/Inventory";
import InventoryUsage from "./components/inventory/InventoryUsage";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
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
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
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

      {/* Protected role-based routes */}
      <Route
        path="/admin"
        element={
          <RoleRoute role="ADMIN">
            <AdminDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/worker"
        element={
          <RoleRoute role="WORKER">
            <WorkerDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/vet"
        element={
          <RoleRoute role="VET">
            <VetDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/animals"
        element={
          <RoleRoute role="ADMIN">
            <Animals />
          </RoleRoute>
        }
      />
      <Route
  path="/admin/users"
  element={
    <RoleRoute role="ADMIN">
      <AdminUsers />
    </RoleRoute>
  }
/>
<Route
  path="/admin/animals/:animalId/feeding"
  element={
    <RoleRoute role={["ADMIN", "WORKER"]}>
      <FeedingLogs />
    </RoleRoute>
  }
/>
<Route
  path="/admin/feeding"
  element={
    <RoleRoute role="ADMIN">
      <FeedingOverview />
    </RoleRoute>
  }
/>

<Route
  path="/admin/health"
  element={
    <RoleRoute role={["ADMIN", "VET"]}>
      <HealthOverview />
    </RoleRoute>
  }
/>

<Route
  path="/admin/animals/:animalId/health"
  element={
    <RoleRoute role={["ADMIN", "VET", "WORKER"]}>
      <AnimalHealth />
    </RoleRoute>
  }
/>

<Route
  path="/admin/inventory"
  element={
    <RoleRoute role={["ADMIN", "WORKER", "VET"]}>
      <Inventory />
    </RoleRoute>
  }
/>

<Route
  path="/admin/inventory/:itemId/usage"
  element={
    <RoleRoute role={["ADMIN", "WORKER", "VET"]}>
      <InventoryUsage />
    </RoleRoute>
  }
/>


    </Routes>
  );
};

export default App;
