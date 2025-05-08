# 🚀 SpaceX Launch Explorer

A modern web application built with React, Zustand, React Query, and Mantine UI that allows users to authenticate and explore past and upcoming SpaceX launches with features like search, sorting, filtering, and detail views.

Live Demo: [https://spacex-explorer-six.vercel.app](https://spacex-explorer-six.vercel.app/)

---

## 🧰 Tech Stack

- **React** – Frontend framework
- **React Router** – Routing and navigation
- **Zustand** – Global state management (for authentication)
- **React Query** – Server state + data fetching
- **Mantine UI** – UI component library
- **SpaceX API** – Public API for launch data
- **Vercel** – Deployment platform

---

## 📦 Features

- 🔐 **Authentication** (with localStorage + Zustand)
- 🔍 **Search** launches by name
- 📊 **Sort** by name, date, or success status
- 📄 **Paginated** list view of launches
- 📌 **Launch detail** page with dynamic routing
- ⚠️ **Error handling** and loading states
- 🎨 GitHub-like dark theme UI using Mantine
- 🚀 **Deployed on Vercel**

---

## Authentication 

- This project uses mock authentication.
- A token is stored in localStorage upon login
- Logout clears the state and redirects the user.


## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/coder-pink/SpaceX-Explorer.git
cd SpaceX-Explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```


