# SaaS Base

Production-ready starter kit for building SaaS applications with Next.js and Supabase.

## Features

- **Authentication**: Email/password and magic link authentication with server-side session management
- **User Management**: Profile system with role-based access control (user, admin)
- **Billing**: Plan system (free/pro) with feature flags, ready for Stripe integration
- **Dashboard**: Protected routes with server-side authentication checks
- **Admin Panel**: User management interface with role assignment
- **Type Safety**: Full TypeScript with strict mode and validated environment variables
- **Security**: Row-level security, server-side validation, protected routes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Forms**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18 or later
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saas-base
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp env.local.example .env.local
```

Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Set up the database:
   - Open your Supabase dashboard
   - Go to SQL Editor
   - Execute the SQL from `supabase/schema.sql`

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Architecture

### Project Structure

```
app/
  actions/          # Server actions (auth, billing, admin)
  admin/            # Admin panel routes
  auth/             # Authentication pages
  dashboard/        # Protected dashboard routes
  dev/              # Development utilities
  layout.tsx        # Root layout with toast provider
  error.tsx         # Global error boundary
  loading.tsx       # Global loading state

components/
  admin/            # Admin-specific components
  auth/             # Authentication forms
  billing/          # Billing-related components
  ui/               # Reusable UI components
  feature-list.tsx  # Feature list component
  page-header.tsx   # Page header component

lib/
  admin.ts          # Admin operations
  auth.ts           # Authentication helpers
  auth-dev.ts       # Development auth utilities
  billing.ts        # Billing logic and feature flags
  env.ts            # Environment variable validation
  profiles.ts       # Profile operations
  supabase/         # Supabase client instances
  toast.tsx         # Toast notification system
  utils.ts          # Utility functions

schemas/            # Zod validation schemas
types/              # TypeScript type definitions
supabase/           # Database schema SQL
```

### Authentication Flow

Authentication is handled server-side using Supabase Auth:

1. User signs up/in via server actions
2. Session managed through HTTP-only cookies
3. Middleware refreshes session on each request
4. Protected routes use `requireUser()` or `requireAdmin()` helpers
5. No client-side auth state management

### Database Schema

The `profiles` table extends `auth.users` with application-specific data:

- Foreign key relationship with cascade delete
- Row-level security policies for data access
- Automatic profile creation via database trigger
- Role-based access control at database level

### Billing System

The billing system is structured for future Stripe integration:

- Plan types stored in database
- Feature flags checked server-side
- Upgrade/downgrade actions ready for payment processing
- No payment processing included (demo mode)

## Development

### Dev Login

In development mode, access `/dev/login` for quick authentication without creating a real user account.

### Environment Variables

All environment variables are validated at startup using Zod. Missing or invalid variables will cause the application to fail fast with clear error messages.

### Type Safety

The project uses TypeScript strict mode. Database types are manually maintained in `types/database.ts` to match the Supabase schema.

## Security

- Row-level security enabled on all database tables
- Server-side validation for all user inputs
- Protected routes with server-side checks
- No secrets exposed to the client
- Environment variables validated at runtime

## Roadmap

- [ ] Stripe integration for payment processing
- [ ] Email notifications
- [ ] User profile editing
- [ ] Team/organization support
- [ ] API rate limiting
- [ ] Audit logging

## License

MIT
