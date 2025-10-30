# WTWR — Frontend (React)

This is the frontend for the WTWR (What To Wear) application. It's a Vite + React app that communicates with the Express backend to provide user authentication and CRUD operations for clothing items.

### The backend repo can be found here:

[text](https://github.com/JosephRodriguez7/se_project_express)

## Features

- Browse clothing items and open item details
- Add new clothing items (authenticated users)
- Delete your own clothing items
- Register / login (JWT stored in localStorage)
- Edit user profile (name and avatar)
- Toggle temperature unit and see weather integration

## Prerequisites

- Node.js (v16+ recommended)
- npm
- Backend API running (default: `http://localhost:3001`)

## Install & Run (development)

```bash
cd se_project_react
npm install
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173).

## Environment / Config

The frontend expects the backend API to be available at `http://localhost:3001` by default. If your backend runs on a different host/port, update the `baseUrl` in `src/utils/api.js`.

JWT token is stored in `localStorage` under the `jwt` key. Protected requests add the header `Authorization: Bearer <token>`.

## Important files

- `src/components/` — React components and modals
- `src/utils/api.js` — API client (handles items, likes, user updates)
- `src/contexts/CurrentUserContext.js` — current user context
- `src/hooks/useForm.js` — small form handling hook

## Quick manual tests

1. Register and log in from the UI. Confirm `localStorage.jwt` is set.
2. Add an item (requires login). Confirm it appears in the list.
3. Open an item you created and delete it.
4. Edit profile on the profile page and verify changes.
