# ARCHITECTURE.md

# System Architecture

## Purpose

Defines the high-level architecture, module boundaries, and engineering principles of the Lively Stones Platform.

---

## Stack

Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui

Backend

* Supabase
* PostgreSQL
* Edge Functions

Deployment

* Vercel
* GitHub Actions

---

## Applications

```text
Public Website
Disciple Portal
Admin Portal
```

Each application has independent routing but shares authentication and design.

---

## Layered Architecture

```text
Presentation
↓

Application

↓

Domain

↓

Infrastructure

↓

Database
```

Business logic belongs in the Application layer.

---

## Modules

* Authentication
* Users
* Bible
* Prayer
* Community
* Learning
* Events
* Notifications
* Departments
* Reports

Each module owns its components, hooks, services and types.

---

## Data Flow

```text
UI

↓

Hook

↓

Service

↓

Supabase

↓

Database
```

Never query Supabase directly inside UI components.

---

## State Management

Use:

* React Query
* Context (global UI only)
* Local state for component interactions

Avoid unnecessary global state.

---

## Folder Structure

```text
src/
components/
features/
hooks/
lib/
services/
types/
utils/
```

Group by feature rather than file type where practical.

---

## Security

* Supabase Auth
* RLS
* Server-side authorization
* Audit logs

---

## Performance

* Lazy loading
* Route splitting
* Optimized images
* Memoization where needed

---

## Engineering Rules

Always:

* Prefer reusable modules.
* Keep modules independent.
* Minimize coupling.
* Document architectural decisions.

Never:

* Mix UI with business logic.
* Duplicate services.
* Bypass architecture.

---

## Principle

> Architecture should make future changes easier, not harder.
