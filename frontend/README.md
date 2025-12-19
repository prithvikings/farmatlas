# FarmAtlas – Frontend

FarmAtlas Frontend is a **role-based farm management dashboard** built with React and Tailwind CSS.  
It provides farm owners, workers, and veterinarians with a clean, responsive interface to interact with farm data exposed by the FarmAtlas backend APIs.

The frontend focuses on **usability, clarity, and controlled access**, ensuring each user role sees only what they are authorized to manage.

---

## 🎯 Purpose

The frontend exists to:

- Give **farm owners** a centralized dashboard to monitor and control farm operations
- Provide **workers and vets** with restricted, task-focused interfaces
- Visualize complex farm data (animals, feed, finance, health) in a simple and actionable way
- Act as a secure client for the FarmAtlas backend APIs

---

## 🧠 Frontend Responsibilities

- Role-based UI rendering
- Secure API communication using JWT
- Dashboard data visualization
- Smooth user experience with animations and transitions
- Form handling and client-side validation
- Guided user onboarding and interactions

---

## 🔑 Core Features

- **Role-Based UI**
  - Admin, Worker, and Vet interfaces differ by permissions
- **Dashboard-Centric Design**
  - Data-driven views for farm activity and records
- **Secure API Integration**
  - Axios-based communication with backend
- **Data Visualization**
  - Charts and graphs for analytics and insights
- **Responsive & Accessible UI**
  - Built using Radix UI and Tailwind CSS
- **Animations & UX Enhancements**
  - Framer Motion for smooth transitions
- **Guided User Experience**
  - Driver.js for tours and onboarding flows

---

## 🧱 Tech Stack

### Core
- **React 19**
- **React Router DOM** – Client-side routing
- **Axios** – API communication

### UI & Styling
- **Tailwind CSS**
- **Radix UI** – Accessible UI primitives
- **Lucide React / React Icons** – Icons
- **class-variance-authority, clsx, tailwind-merge** – Component styling utilities
- **tailwind-animate** – UI animations

### Animations & UX
- **Framer Motion**
- **motion**
- **Driver.js** – User walkthroughs

### Data & Visualization
- **Recharts** – Charts and analytics
- **React Markdown / Markdown Preview** – Rich text rendering

---

## 🔐 Authentication & Authorization (Frontend)

- JWT token is stored client-side after login
- Token is attached to all protected API requests
- UI rendering is controlled based on:
  - Authentication state
  - User role received from backend
- Unauthorized routes and components are blocked at the UI level

> The frontend **does not trust itself** — final authorization is always enforced by the backend.

---

## 🚀 Running the Frontend Locally
```
cd frontend
npm install
npm run dev
```

- The app runs on the Vite development server.


## 📌 Project Status
- Type: College Project (Production-oriented UI)

- Status: Frontend core completed

- Backend: Node.js + Express + MongoDB

- Deployment: Not hosted yet

## 🧠 Design Notes
- UI is built to scale with backend features

- Role-based rendering avoids exposing unauthorized data

- Component-driven architecture for reusability

- Strong separation between UI, routing, and API logic

- Ready for future features like analytics dashboards, notifications, and AI-assisted insights