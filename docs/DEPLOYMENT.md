# DEPLOYMENT.md

# Deployment Guide

## Purpose

Ensure every deployment is repeatable, safe, and reversible.

Production deployments should never be manual experiments.

---

# Environments

Maintain separate environments:

* Development
* Preview
* Production

Never connect local development directly to production resources.

---

# Hosting

Frontend:

* Vercel

Backend:

* Supabase

Storage:

* Supabase Storage

CI/CD:

* GitHub Actions

---

# Environment Variables

Separate variables for each environment.

Examples:

* SUPABASE_URL
* SUPABASE_ANON_KEY
* SERVICE_ROLE_KEY
* RESEND_API_KEY

Never expose server secrets to the client.

---

# Pre-Deployment Checklist

* All tests passing
* Build successful
* TypeScript clean
* ESLint clean
* No critical vulnerabilities
* Database migrations reviewed
* Documentation updated

---

# Deployment Flow

```text
Feature Branch
      ↓
Pull Request
      ↓
CI Checks
      ↓
Code Review
      ↓
Preview Deployment
      ↓
Approval
      ↓
Production
```

Never deploy directly from local machines.

---

# Database Migrations

Rules:

* Version-controlled
* Reviewed
* Reversible
* Tested in Preview first

Never edit production tables manually.

---

# Seed Data

Development and preview may use seed data.

Production must never contain dummy or placeholder content.

---

# Rollback Plan

Every deployment must support rollback.

Rollback triggers:

* Failed build
* Critical bug
* Security issue
* Database migration failure

Document recovery steps.

---

# Monitoring

After deployment verify:

* Authentication
* Home page
* Bible system
* Prayer system
* Community
* Admin portal
* Error logs

Monitor for at least 30 minutes after major releases.

---

# Release Strategy

Prefer:

* Small releases
* Frequent deployments
* Fast rollback
* Continuous improvement

Avoid large "big bang" releases.

---

# Backup

Before production deployment:

* Database backup
* Storage backup
* Migration snapshot

Verify backups regularly.

---

# Git Strategy

Branches:

* main
* develop
* feature/*
* hotfix/*
* release/*

Protect `main`.

Require:

* PR review
* Passing CI
* No merge conflicts

---

# Post-Deployment Checklist

* Smoke tests passed
* Analytics functioning
* Notifications working
* Storage accessible
* Security headers verified
* Logs reviewed

---

# Release Notes

Every production release should include:

* Features
* Improvements
* Bug fixes
* Breaking changes
* Migration notes

Maintain a `CHANGELOG.md`.

---

# Product Principle

> **Deploy with confidence, monitor with discipline, and always be prepared to roll back safely.**
