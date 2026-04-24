# Supabase Setup

Run `supabase/migrations/20260424190000_membership.sql` in your Supabase SQL editor or through the Supabase CLI.

Required tables:
- `profiles`
- `subscriptions`
- `usage_limits`
- `favorites`
- `recommendation_history`
- `downloads`
- `leads`
- `events`

The migration enables RLS, creates a profile automatically after signup, and adds `increment_usage_limit` for free-plan limits.
