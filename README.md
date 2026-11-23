# Aviation Starter ✈

A fresh, beginner-friendly React + Express classroom project. Explore eight fictional flights, open a flight's details, and switch between light and dark themes. The login page is UI only.

## Requirements

- Node.js 22.12 or newer (Node 24 LTS recommended), npm, and two terminals.
- No database, API key, or external flight service needed.

## Install and run

Download and extract this project, or clone your instructor's GitHub repository and open its root folder.

Terminal 1 — Express API:

```bash
cd server
npm ci
npm run dev
```

Terminal 2 — React frontend:

```bash
cd client
npm ci
npm run dev
```

Open http://localhost:5173. Keep both terminals running. Stop with Ctrl+C.

`npm ci` installs exact versions from the included lockfiles. Use `npm install` when intentionally changing dependencies.

### Environment configuration

No `.env` file is required for local development. Example files are included for reference.

- Server: optionally copy `server/.env.example` to `server/.env`. Default `PORT` is `5000`.
- Client: optionally copy `client/.env.example` to `client/.env`. `VITE_API_URL` defaults to `/api`. Never put secrets in `VITE_` variables; they are exposed to the browser.
- Vite proxies `/api` to `http://localhost:5000`, so local requests need no CORS library. If you change the server port, update the proxy targets in `client/vite.config.js` too. Restart after configuration changes.
- Hosting client and API on different origins later requires appropriate server CORS configuration, or a same-origin reverse proxy. This starter is configured for local use.

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Landing page and Explore Flights link |
| `/flights` | API fetching and reusable flight cards |
| `/flights/:id` | Dynamic route using `useParams()` and the single-flight API |
| `/login` | Controlled email/password form; no authentication |

Unknown frontend URLs show a friendly page-not-found screen.

## Project structure

```text
aviation-starter/
├── .gitignore
├── README.md
├── CLASSROOM_TASKS.md
├── client/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── styles.css
│       ├── components/ (Navbar, FlightCard)
│       ├── contexts/ (ThemeContext, AuthContext)
│       └── pages/ (Home, Flights, FlightDetails, Login)
└── server/
    ├── .env.example
    ├── package.json
    ├── package-lock.json
    ├── server.js
    └── data/flights.js
```

## API endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Response |
| --- | --- | --- |
| GET | `/api/flights` | `200`: array of eight flights |
| GET | `/api/flights/1` | `200`: one flight object |
| GET | `/api/flights/unknown` | `404`: `{ "message": "Flight not found." }` |

Flight IDs are strings. Prices are numeric INR amounts. Times are illustrative local airport times; no real dates or availability are represented. Data stays in a JavaScript array.

## How the pieces connect

`main.jsx` wraps the app with the router and both context providers. Navbar reads ThemeContext; toggling it changes CSS variables throughout the app. Theme resets on refresh to keep the starter simple.

Flights fetches Express data in `useEffect`, stores it in state, and renders FlightCard components. Each card links to `/flights/:id`; FlightDetails reads that ID with `useParams()` and fetches the matching flight. Requests are cancelled when leaving a page. Both pages handle loading, errors, and missing data.

AuthContext exposes `user` (initially `null`), a TODO `login()` function, and `logout()` that clears user state. No credentials are sent or stored. No signup, protected routes, UUID sessions, JWTs, database, or booking behavior exists yet.

## Build and preview

```bash
cd client
npm run build
npm run preview
```

Open the preview URL printed in the terminal (usually http://localhost:4173). Keep Express running separately; preview also proxies `/api`. Build output is in `client/dist/` and is excluded from Git. For a production API process, run `npm start` inside `server/`. Express does not serve the frontend build.

## Classroom roadmap

1. Dynamic routing and flight details — trace the included route, then extend it.
2. Registration and login with Express.
3. UUID-based session authentication.
4. AuthContext and protected routes.
5. JWT authentication.
6. MongoDB integration and flight bookings.

See [CLASSROOM_TASKS.md](CLASSROOM_TASKS.md) for progressively scoped exercises.

## Quick manual checks

- Home → Explore Flights → View details → All flights.
- Open `/flights/1` directly and refresh; open `/flights/unknown` for the 404 state.
- Toggle the theme on different pages, including Login.
- Submit valid-looking fields on Login: a demo notice appears, with no authentication.
- Stop Express and refresh Flights to see the error state.
- Temporarily return `[]` from the list endpoint to see the empty state, then restore it.
- Use browser network throttling to observe the loading state.
- Check at mobile width and navigate links, form inputs, and theme button with the keyboard.

## Publish to GitHub

Create an empty GitHub repository, then run these commands from this project root:

```bash
git init
git add .
git commit -m "Add aviation classroom starter"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```


