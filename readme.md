# FarmAtlas 🐄🌾  
**A Role-Based Livestock & Farm Management Web Application**

FarmAtlas is a **full-stack livestock management system** designed to help farm owners monitor, manage, and control all farm operations from a single dashboard.

The platform supports **role-based access** for farm owners, workers, and veterinarians, ensuring that each user sees and manages only what they are authorized to access.

---

## 🎯 Problem Statement

Traditional farm management is fragmented:

- Animal records are scattered
- Health and feeding logs are poorly tracked
- Financial data lacks structure
- Workers and vets operate without a unified system
- Farm owners lack real-time visibility

FarmAtlas solves this by providing a **centralized, secure, and role-aware digital farm management system**.

---

## 🧠 What FarmAtlas Does

FarmAtlas allows farm owners to:

- Track livestock details and health history
- Monitor feed usage and inventory
- Manage workers and veterinarians
- Record farm expenses and financial transactions
- Control access using role-based permissions
- View all farm activity from one dashboard

At the same time:
- **Workers** access only operational data (e.g. feed logs)
- **Vets** access only animal health records

---

## 👥 User Roles

- **Admin / Farm Owner**
  - Full control over farm operations and data
- **Worker**
  - Limited access to assigned operational tasks
- **Veterinarian**
  - Access to animal health and medical records only

Role-based access is enforced **both on the frontend and backend**.

---

## 🧩 Core Features

- Role-Based Access Control (RBAC)
- Livestock Management
- Health Records & Veterinary Logs
- Feed & Inventory Management
- Expense & Financial Tracking
- Secure JWT Authentication
- Dashboard-Based UI
- Data Visualization & Analytics
- Scalable, modular architecture

---

## 🏗️ Tech Stack

### Frontend
- React 19
- Tailwind CSS
- React Router DOM
- Axios
- Radix UI
- Framer Motion
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Redis (Caching)
- Middleware-based RBAC

---

## 📁 Project Structure

```text
FarmAtlas/
│
├── backend/        # Node.js + Express backend
│   └── README.md   # Backend-specific documentation
│
├── frontend/       # React + Tailwind frontend
│   └── README.md   # Frontend-specific documentation
│
└── README.md       # Root-level project documentation
```
Each part of the system has its own detailed README for clarity and maintainability.

## 🔐 Security & Access Model

- JWT-based authentication

- Role-based authorization enforced at middleware level

- Farm-level data isolation

- Frontend UI restricted by role

- Backend is the final authority for permissions

## 🚀 Getting Started (Local Setup)
### Backend
```
cd backend
npm install
npm run dev
```
### Frontend
```
cd frontend
npm install
npm run dev
```
Make sure to configure environment variables as described in the respective README files.

## 📌 Project Status
- Type: College Project (Production-style architecture)

- Status: Core features implemented

- Deployment: Not hosted yet

- Future Scope: High (see below)

## 🔮 Future Enhancements
- Advanced analytics and reporting

- Notification and alert system

- AI-based health insights

- Multi-farm support

- Exportable reports


## 🧠 Design Philosophy
- Separation of concerns across layers

- Real-world role-based workflows

- Scalable architecture, not hardcoded logic

- Backend-first security mindset

- UI focused on clarity and usability

## ✍️ Author
Developed as a full-stack college project with a focus on system design, security, and scalability.