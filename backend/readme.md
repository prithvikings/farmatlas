# FarmAtlas – Backend

FarmAtlas is a **role-based livestock management system backend** designed to help farm owners monitor and control all farm operations from a centralized dashboard.  
This backend powers authentication, authorization, data management, and business logic for livestock, workers, vets, finances, and farm operations.

---

## 🎯 Purpose

The backend enables a **single source of truth** for farm operations by:

- Giving **farm owners** complete visibility and control
- Restricting **workers and vets** to only the data they are authorized to access
- Structuring farm data into clear, manageable domains (animals, health, feed, finance, inventory)

This system is built to scale beyond a demo and reflects real-world farm management workflows.

---

## 👥 User Roles & Access Control

Role-based access is enforced using middleware and JWT authentication.

### Roles

- **Admin / Farm Owner**
  - Full access to all farm data
  - Manage users, animals, finances, inventory, and permissions

- **Worker**
  - Limited access (e.g. feed logs, assigned animals, basic inventory usage)

- **Veterinarian**
  - Access to animal health records and medical history only

Access is enforced using:
- JWT authentication
- Role-based middleware
- Farm ownership validation

---

## 🔑 Core Features

- JWT-based Authentication & Authorization
- Role-Based Access Control (RBAC)
- Livestock Management
  - Animal records
  - Health history
  - Feeding logs
- Health Records Management
- Feed & Inventory Tracking
- Financial Tracking
  - Expense and transaction records
- Worker & Vet Management
- Centralized Admin Dashboard APIs
- Input Validation using Schemas
- Error Handling & Logging
- Redis integration (for caching / performance readiness)

---

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Caching:** Redis
- **Validation:** Schema-based validation
- **Logging & Error Handling:** Centralized middleware

---

## 📁 Backend Folder Structure

```text
backend/
│
├── config/                # DB, env, Redis configuration
│
├── controllers/           # Business logic for each domain
│   ├── animal.controllers.js
│   ├── auth.controllers.js
│   ├── feedingLog.controllers.js
│   ├── financial.controllers.js
│   ├── health.controllers.js
│   ├── inventoryItem.controllers.js
│   ├── inventoryUsage.controllers.js
│   ├── vet.controllers.js
│   ├── worker.controllers.js
│   └── adminDashboard.controllers.js
│
├── middlewares/           # Auth, role checks, validation, error handling
│   ├── isAuth.js
│   ├── requireRole.js
│   ├── checkFarmOwnership.js
│   ├── validate.js
│   └── errorHandler.js
│
├── models/                # Mongoose models
│   ├── animal.models.js
│   ├── farm.models.js
│   ├── feedingLog.models.js
│   ├── financialTransaction.models.js
│   ├── healthRecord.models.js
│   ├── inventoryItem.models.js
│   ├── inventoryUsage.models.js
│   └── user.models.js
│
├── routes/                # API routes
│   ├── auth.routes.js
│   ├── animal.routes.js
│   ├── feedingLog.routes.js
│   ├── financial.routes.js
│   ├── health.routes.js
│   ├── inventory.routes.js
│   ├── user.routes.js
│   ├── vet.routes.js
│   └── worker.routes.js
│
├── services/              # Business services (future expansion ready)
│
├── utils/                 # Tokens, mail, helpers
│
├── validation/            # Request validation schemas
│
├── app.js                 # Express app configuration
├── server.js              # Server bootstrap
└── package.json

```

## 🔐 Authentication Flow

1. User logs in → JWT issued  
2. JWT attached to subsequent requests  
3. `isAuth` middleware validates the token  
4. `requireRole` enforces role-based permissions  
5. `checkFarmOwnership` ensures data isolation per farm  

### This prevents:
- Cross-farm data leaks  
- Unauthorized role access  
- Privilege escalation  

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=
MONGO_URI=
JWT_SECRET=
REDIS_URL=
NODE_ENV=
```

## 🚀 Running the Backend Locally

```bash
cd backend
npm install
npm run dev
```

## 📌 Project Status
- **Type:** College Project (Production-style architecture)
- **Status:** Backend core completed
- **Hosting:** Not deployed yet
- **Frontend:** React + Tailwind (separate README planned)

## 🧠 Design Notes
- Built with scalability in mind
- Clear separation of concerns
- Role-based logic enforced at middleware level
- Ready for future expansion (analytics, notifications, AI modules)