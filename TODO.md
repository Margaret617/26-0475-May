# TODO - Fix motore app

- [ ] Replace placeholder `src/App.jsx` with real app wrapper that renders routes (and optional global layout).
- [ ] Wire all existing pages into `src/routes/AppRoutes.jsx`.
- [ ] Implement real auth logic in `src/components/ProtectedRoute/ProtectedRoute.jsx` (use localStorage token/flag; redirect to /login).
- [ ] Ensure `src/pages/Login/Login.jsx` sets auth state (token/flag) on submit and redirects to /private-notes.
- [ ] Add missing routes for Notes/PrivateNotes/BlogPost/Contact if components expect them.
- [ ] Ensure build succeeds (`npm run build`).
- [ ] Re-run tests (`npm test`).

