# Expense Tracker Frontend

This is the React + Vite frontend for the Expense Tracker MERN application.

## Features
- User authentication (login/register)
- Expense CRUD operations
- Filtering by date and category
- Analytics dashboard with charts (Recharts)
- Tailwind CSS for styling
- React Context API for state management

## Getting Started

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Start the development server:
   ```powershell
   npm run dev
   ```

## Environment Variables
- `VITE_API_URL` (optional): Set your backend API URL if not using the default `http://localhost:5000/api`.

---

For backend setup and API documentation, see the backend folder.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
