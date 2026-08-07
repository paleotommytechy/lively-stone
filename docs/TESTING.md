# TESTING.md

# Testing Standards

## Purpose

Every feature must be verified before merging into `main`.

Testing ensures reliability, security, accessibility, and a consistent user experience.

Testing is mandatory—not optional.

---

# Testing Pyramid

```text
            E2E
       Integration Tests
         Unit Tests
```

Prefer many unit tests, fewer integration tests, and a small number of end-to-end tests.

---

# Required Test Types

## Unit Tests

Test:

* Utility functions
* Hooks
* Services
* Permission helpers
* Validation logic
* Business rules

Target: **≥ 80% coverage** for critical business logic.

---

## Integration Tests

Verify interactions between:

* Supabase
* Authentication
* Database queries
* API routes
* Forms
* Feature modules

---

## End-to-End Tests

Use **Playwright**.

Critical flows:

* Register
* Login
* Logout
* Forgot Password
* Complete Onboarding
* Bible Reading
* Prayer Request
* Community Post
* Event Registration
* Admin Login
* Content Publishing

Every production release must pass all E2E tests.

---

# Accessibility Testing

Verify:

* Keyboard navigation
* Screen reader compatibility
* Color contrast
* Focus indicators
* Responsive layouts

Target WCAG AA.

---

# Performance Testing

Measure:

* Lighthouse
* Bundle size
* Route loading
* API response time
* Database query performance

Reject changes causing significant regressions.

---

# Security Testing

Verify:

* RLS policies
* Permission checks
* Protected routes
* File uploads
* Input validation
* Authentication flow

---

# Regression Testing

Before each release verify:

* Authentication
* Navigation
* Profile
* Bible
* Prayer
* Community
* Admin Portal

---

# Manual QA Checklist

* No console errors
* No TypeScript errors
* No ESLint warnings
* Responsive on mobile/tablet/desktop
* Dark mode verified
* Loading states
* Error states
* Empty states

---

# Code Quality

Every Pull Request must:

* Build successfully
* Pass lint
* Pass type-check
* Pass unit tests
* Pass Playwright tests

No exceptions.

---

# Test Data

Never use production data.

Create dedicated seed scripts for:

* Users
* Events
* Courses
* Prayer Requests
* Community Posts

---

# CI Requirements

GitHub Actions should run:

1. Install
2. Type Check
3. ESLint
4. Unit Tests
5. Build
6. Playwright
7. Security Audit

Merge blocked if any step fails.

---

# Definition of Done

A feature is complete only if:

* Requirements implemented
* Tests written
* Documentation updated
* Accessibility verified
* Performance acceptable
* Security reviewed
* Code approved

---

# Product Principle

> **If it isn't tested, it isn't finished.**
