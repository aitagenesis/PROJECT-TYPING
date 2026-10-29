# Typing App

This folder contains the starter structure for the typing application. It has a React/Vite client and an Express API server.

## Project layout

- `client/` — React user interface.
- `server/` — Express API, authentication, user data, and typing scores.
- `public/` — favicon, logo, and keypress sound.
- `.env.example` — names of the environment variables the server expects.

## Initial setup

1. Open a terminal in this `typing-app` folder.
2. Install the root and workspace dependencies:

   ```sh
   npm install
   npm install --prefix server
   npm install --prefix client
   ```

3. Copy `.env.example` to `.env` and provide your own local database URI and JWT secret.
4. Run `npm run dev` to start the client and API development servers.

The source files are starter scaffolding and should be reviewed and configured before production use. Do not commit a real `.env` file or production secrets.