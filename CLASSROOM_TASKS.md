# Classroom roadmap

Start each task from a working version. Make one small change at a time and commit after each class.

## Task 1 — Dynamic routing and flight details

**Statement:** Explain how clicking View details opens the selected flight using its ID. Trace `Link`, `/flights/:id`, `useParams()`, and the Express `find()` call. Then add a `terminal` property to the flight data and display it on the details page.

Already provided: working dynamic route, details API, and missing-flight handling.

Done when: two different flight IDs show their own terminal, and an unknown ID still shows an error.

## Task 2 — Registration and login with Express

**Statement:** Add a signup UI and registration/login endpoints. Validate input, hash passwords with bcrypt, and reject duplicate emails. Start with an in-memory users array and explain that restarting clears it. Never return password hashes to the browser.

Done when: a new user can register, correct credentials are accepted, and incorrect credentials are rejected. Persistent login comes next.

## Task 3 — UUID-based session authentication

**Statement:** Generate a random UUID session token after successful login. Keep a server-side mapping from token to user with an expiry. Add middleware to validate the session for a current-user endpoint; invalidate the session on logout.

Done when: a valid session returns the current user; missing, expired, and revoked tokens fail. Explain that UUID tokens require server-side storage and can have expiry; restarting an in-memory store logs everyone out.

## Task 4 — AuthContext and protected routes

**Statement:** Connect the form to the API, implement the AuthContext login/logout placeholders, and add a protected profile page. Restore the current user from a valid session and update the Navbar.

Done when: anonymous users are redirected to Login; logout revokes the session and clears UI state. Frontend route guards are for navigation; backend middleware must still protect data. Discuss token storage and prefer HttpOnly cookies for browser sessions, with appropriate CSRF protection.

## Task 5 — JWT authentication

**Statement:** Replace the UUID session lookup with signed, expiring JWT verification. Read the signing secret from the server environment. Explain header, payload, signature, verification, expiry, and revocation tradeoffs. JWT payloads are readable, so do not include secrets.

Done when: a valid token works and expired or modified tokens fail. Explain that clearing a token in the UI alone does not revoke an already issued JWT.

## Task 6 — MongoDB integration and flight bookings

**Statement:** Persist users and flights with Mongoose, then build authenticated bookings linked to the user and flight. Validate requests and return each user's own bookings. Handle limited capacity with atomic database operations so concurrent requests cannot oversell seats.

Done when: data survives a restart, a user can book a flight, and users cannot read or cancel someone else's booking.

These are future exercises. This starter intentionally implements only routing, flight fetching, theme context, an auth provider shell, and the login UI.
