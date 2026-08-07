# AUTHENTICATION.md

# Authentication Architecture

## Purpose

This document defines the authentication, authorization, onboarding, session management, and account lifecycle for the Lively Stones Platform.

Authentication should be **simple, secure, and invisible**. Users should spend their time growing spiritually—not managing accounts.

Authentication verifies **who the user is**.

Authorization determines **what the user can access**.

Onboarding determines **how they begin their discipleship journey**.

These three concerns must remain separate.

---

# Authentication Principles

The authentication system must be:

* Secure by default
* Mobile-first
* Minimal friction
* Role-aware
* Session-safe
* Easy to maintain
* Built on Supabase Auth

Authentication should never contain business logic.

---

# Supported Authentication Methods

## Primary

* Email & Password

---

## Future

* Google
* Apple
* Microsoft
* Magic Link
* Phone Authentication (Optional)

Every provider must create the same application user profile.

---

# Account Lifecycle

```text
Visitor
    │
    ▼
Register
    │
    ▼
Verify Email
    │
    ▼
Create User Profile
    │
    ▼
Assign Default Role
    │
    ▼
Complete Onboarding
    │
    ▼
Enter Disciple Portal
```

Users should **never** enter the application without completing onboarding.

---

# Registration Flow

Collect only:

* Full Name
* Email
* Password

Optional:

* Invitation Code
* Referral Code

Do **not** collect long profile information during registration.

Keep registration under 60 seconds.

---

# Email Verification

Email verification should occur before onboarding.

If email is unverified:

* Restrict sensitive actions.
* Display a persistent verification reminder.
* Allow resending verification.

---

# Onboarding

Authentication ends here.

Onboarding begins.

Collect:

* Profile Picture
* Biography
* Phone Number
* Gender (Optional)
* Date of Birth (Optional)
* Country
* State
* City
* Occupation / School
* Church
* Fellowship
* Spiritual Interests
* Prayer Interests

Progress should be saved automatically.

Users can continue later.

---

# Profile Completion

Profile completion should be measured.

Examples:

* Avatar
* Bio
* Contact
* Location

Display:

```text
Profile Completion

82%
```

Encourage completion without blocking normal platform usage after onboarding.

---

# Role Assignment

Every new user receives:

```text
Disciple
```

Additional roles are assigned only by authorized administrators.

Never trust role values from the client.

Always validate permissions on the server.

---

# Session Management

Use Supabase sessions.

Requirements:

* Secure cookies
* Automatic refresh
* Idle timeout
* Logout everywhere
* Device tracking (Future)

The application should recover gracefully from expired sessions.

---

# Login Flow

```text
Login

↓

Authenticate

↓

Email Verified?

↓

No

↓

Verify Email

↓

Continue

-------------------

Yes

↓

Onboarding Complete?

↓

No

↓

Continue Onboarding

↓

Home

-------------------

Yes

↓

Home
```

The login flow should never bypass onboarding.

---

# Forgot Password

Flow:

```text
Forgot Password

↓

Email Link

↓

Reset Password

↓

Sign In
```

Passwords should never be recoverable—only resettable.

---

# Logout

Logout should:

* Destroy session
* Clear cached user data
* Clear local storage (except preferences)
* Redirect to Landing Page

Never leave protected data cached after logout.

---

# Account Status

Supported states:

* Pending Verification
* Active
* Suspended
* Disabled
* Archived

Suspended users cannot authenticate.

Archived users retain historical records.

---

# Protected Routes

Public:

* Landing
* About
* Events
* Teachings
* Login
* Register

Authenticated:

* Home
* Materials
* Community
* Notifications
* Profile

Admin:

* Dashboard
* Reports
* Content
* Departments
* Settings

Every protected route must validate authentication and permissions server-side.

---

# Authorization Strategy

Authentication does **not** determine access.

Authorization uses:

* Roles
* Permissions
* Department Membership
* Ownership
* Row Level Security (RLS)

Never rely on client-side route guards alone.

---

# Multi-Role Users

Users may hold multiple roles simultaneously.

Example:

```text
Disciple

Media

Prayer
```

The UI should dynamically expose only authorized features.

---

# Admin Impersonation

Future Feature.

Super Admins may temporarily impersonate users for support.

Requirements:

* Audit log
* Explicit notification
* Read-only option
* Automatic expiration

Every impersonation session must be recorded.

---

# Security Requirements

Passwords:

* Never stored manually
* Never logged
* Never exposed through APIs

Tokens:

* Never stored in localStorage
* Use secure HttpOnly cookies where supported
* Rotate automatically

Sensitive endpoints:

* Rate limited
* CSRF protected where applicable
* Protected by RLS

---

# Authentication Events

Record:

* Login
* Logout
* Password Reset
* Email Verification
* Role Changes
* Suspicious Activity

Events should feed audit logs.

---

# Error Handling

Authentication errors should be clear but safe.

Good:

* Invalid email or password.
* Session expired.
* Please verify your email.

Avoid:

* Email does not exist.
* Incorrect password for user X.

Never leak sensitive information.

---

# UX Principles

Authentication should feel invisible.

Users should:

* Register quickly.
* Verify easily.
* Complete onboarding naturally.
* Resume where they left off.
* Never be confused about what happens next.

The first meaningful screen after authentication is **Home**, not a dashboard full of placeholders.

---

# Guiding Principle

> **Authentication is the entrance to the platform. Onboarding begins the journey. Discipleship starts at Home. These are three distinct experiences and should never be merged into one.**
