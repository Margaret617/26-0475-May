# Supabase Auth Migration

## Task: Fix login details not being saved to Supabase

### Root Cause
`Register.jsx` silently swallowed the `profiles` table insert error, so users saw "success" even when their profile data was never saved to Supabase.

### Plan Steps
- [x] Analyze Register.jsx signup + profile insert flow
- [x] Surface profile insert errors to the user instead of ignoring them
- [x] Only show success when both auth signup AND profile insert succeed
- [x] Provide clear guidance in the UI if the `profiles` table / RLS is misconfigured
- [x] Verify Login.jsx uses signInWithPassword correctly (already does)
- [ ] Test: register a new account, confirm profile appears in `profiles` table

## Verification
- [x] Build compiles successfully
- [ ] Login flow works and shows user name in Profile
- [ ] Register flow creates account AND profile row in Supabase
- [ ] Profile errors are visible in the UI when they occur

