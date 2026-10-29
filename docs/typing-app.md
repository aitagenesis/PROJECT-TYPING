# Typing App — project notes

The typing app is organized directly in the repository root. The original repository README and the existing `frontend files/` folder are preserved.

## Main folders

- `client/` — React and Vite interface.
- `server/` — Express API, authentication, user records, and typing scores.
- `public/` — favicon, logo, and keypress audio.
- `docs/` — additional project documentation.

## Setup outline

1. Install root dependencies with `npm install`.
2. Install server dependencies with `npm install --prefix server`.
3. Install client dependencies with `npm install --prefix client`.
4. Copy `.env.example` to `server/.env`, then set a database URI and a strong JWT secret.
5. Set `VITE_API_URL=http://localhost:5000/api` in `client/.env`.
6. Make sure MongoDB is running, then start both development processes with `npm run dev` from the repository root.

These files are a starter implementation. Configure and test the app in your own development environment before production use. Never commit real credentials or secrets.