# SECURITY.md

# Security Standards

## Purpose

Protect user data, ministry resources, and platform integrity using secure-by-default engineering practices.

Security is part of development—not a final checklist.

---

# Core Principles

* Least privilege
* Defense in depth
* Secure by default
* Zero trust
* Privacy first
* Audit everything

---

# Authentication

* Use Supabase Auth only.
* Never build custom authentication.
* Verify emails.
* Support MFA (future).
* Secure session handling.
* Automatic token refresh.

---

# Authorization

* Enforce Row Level Security on every protected table.
* Validate permissions server-side.
* Never trust client roles.
* Use permission-based authorization.

---

# Passwords

* Never store passwords.
* Never log passwords.
* Never expose password hashes.
* Never implement custom hashing.

---

# Secrets

Store secrets only in:

* Vercel Environment Variables
* Supabase Secrets
* GitHub Secrets

Never commit:

* API keys
* Service role keys
* JWT secrets
* `.env` files

---

# API Security

Every endpoint must:

* Validate input
* Authenticate user
* Authorize action
* Return sanitized data
* Handle errors safely

---

# Input Validation

Use:

* Zod
* Server validation
* Type-safe parsing

Never trust frontend validation.

---

# Database

* UUID primary keys
* Foreign key constraints
* Indexed queries
* Soft deletes where appropriate
* Audit logs

Enable RLS on every user-owned table.

---

# File Uploads

Allow only approved file types.

Limit:

* Size
* MIME type
* Quantity

Store uploads in Supabase Storage.

Never execute uploaded files.

---

# XSS Protection

* Escape user content
* Sanitize rich text
* Validate URLs
* Prevent script injection

---

# CSRF

Protect state-changing requests.

Use secure cookies where applicable.

---

# Rate Limiting

Apply limits to:

* Login
* Registration
* Password reset
* File uploads
* Comments
* Community posts
* Public APIs

---

# HTTP Security

Enable:

* HTTPS only
* HSTS
* CSP
* X-Frame-Options
* X-Content-Type-Options
* Referrer-Policy
* Permissions-Policy

---

# Logging

Audit:

* Login
* Logout
* Role changes
* Permission updates
* Content deletion
* Admin actions

Never log sensitive data.

---

# Dependencies

* Weekly dependency updates
* Automated vulnerability scanning
* Remove unused packages
* Lock dependency versions

---

# CI Security Gates

Every pull request must pass:

* Type checking
* ESLint
* Unit tests
* Playwright tests
* Secret scanning
* Dependency audit
* Build verification

No failing checks may be merged.

---

# Git Rules

Never commit:

* node_modules
* build artifacts
* coverage reports
* generated files
* credentials

Protect the `main` branch with required reviews and passing CI.

---

# Data Privacy

Users own their data.

Support:

* Data export
* Account deletion
* Consent management
* Privacy settings

Collect only necessary information.

---

# Monitoring

Track:

* Authentication failures
* Suspicious activity
* API errors
* Upload failures
* Database performance

Alert on abnormal behavior.

---

# Backup & Recovery

* Automated database backups
* Storage backups
* Recovery testing
* Documented rollback plan

Backups should be encrypted.

---

# Incident Response

1. Detect
2. Contain
3. Investigate
4. Recover
5. Review
6. Improve

Document every security incident.

---

# Developer Rules

Always:

* Write secure code.
* Review permissions.
* Sanitize outputs.
* Remove dead code.
* Keep dependencies updated.
* Write tests for security-critical features.

Never:

* Disable RLS.
* Expose service role keys.
* Merge failing CI.
* Return sensitive fields.
* Leave debug endpoints in production.
* Use mock authentication in production.

---

# Security Checklist

Before every release:

* ✅ Tests passing
* ✅ Build passing
* ✅ RLS verified
* ✅ Secrets protected
* ✅ Security headers enabled
* ✅ No critical vulnerabilities
* ✅ Dead code removed
* ✅ Documentation updated

---

# Product Principle

> **Every feature must be secure before it is considered complete. Convenience should never override the protection of our users, ministry, or data.**
