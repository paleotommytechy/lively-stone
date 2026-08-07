# AGENTS.md

# Lively Stones Engineering Constitution

## Purpose

This document defines the mandatory engineering standards for every AI agent and human contributor working on the Lively Stones codebase.

These rules override convenience, speed, and personal preference.

If a task violates this document, **do not implement it**.

---

# Mission

Build a secure, maintainable, scalable discipleship platform that helps people love God, engage Scripture, pray consistently, grow in community, and serve faithfully.

Every change should move the platform closer to this mission.

---

# Core Principles

Always optimize for:

* Security
* Simplicity
* Maintainability
* Accessibility
* Performance
* Reusability
* User Experience

Never optimize for speed of implementation alone.

---

# Architecture Rules

Before writing code:

* Read the relevant documentation.
* Understand existing architecture.
* Reuse existing modules.
* Avoid introducing new patterns without justification.

Never rewrite working architecture unnecessarily.

---

# Code Quality

Every Pull Request must:

* Build successfully
* Pass ESLint
* Pass TypeScript
* Pass tests
* Pass Playwright
* Have zero console errors

Never merge failing code.

---

# Authentication

Always use Supabase Auth.

Never:

* Create mock authentication
* Leave bypass login
* Return password hashes
* Store credentials manually

Authentication belongs to Supabase.

---

# Authorization

Always enforce:

* RLS
* Permission checks
* Ownership validation

Never trust the frontend.

---

# Security

Before merging verify:

* No exposed secrets
* No debug routes
* No public admin endpoints
* No unrestricted uploads
* No unsafe queries

Security is required.

---

# Testing

Every feature requires:

* Unit tests
* Integration tests where needed
* Playwright coverage for critical flows

Never mark work complete without testing.

---

# Dead Code

Before every commit:

* Remove unused imports.
* Remove unused variables.
* Remove commented code.
* Remove obsolete files.
* Remove unused components.

Leave the repository cleaner than you found it.

---

# Duplicate Code

Before creating:

* Component
* Hook
* Utility
* Service
* API

Search the repository first.

If similar functionality exists:

Extend it.

Do not duplicate it.

---

# Complexity

Functions should:

* Do one thing.
* Be easy to read.
* Prefer early returns.
* Avoid deep nesting.

Refactor large functions.

---

# Components

Use:

* shadcn/ui
* Lucide React
* React Hook Form
* Zod

Do not create custom UI when an existing component solves the problem.

---

# Performance

Avoid:

* Unnecessary renders
* Large client bundles
* Duplicate API requests
* N+1 queries

Lazy load where appropriate.

---

# Accessibility

Every UI must support:

* Keyboard navigation
* Screen readers
* Focus states
* Responsive layouts

Accessibility is mandatory.

---

# Documentation

If architecture changes:

Update documentation.

Never leave documentation outdated.

---

# Pull Request Checklist

Before requesting review:

* Code builds
* Tests pass
* Documentation updated
* No dead code
* No duplicate logic
* Permissions verified
* Responsive verified
* Accessibility verified

---

# CI Requirements

Every PR must pass:

* Install
* Lint
* Type Check
* Unit Tests
* Build
* Playwright
* Security Audit

No exceptions.

---

# Git Rules

Never commit:

* node_modules
* build artifacts
* .env
* secrets
* generated files

Keep commits focused and descriptive.

---

# Review Standards

Every code review should check:

* Correctness
* Simplicity
* Security
* Performance
* Accessibility
* Documentation
* Tests

Not just whether the feature works.

---

# AI Agent Responsibilities

Before coding:

* Read AGENTS.md.
* Read relevant project documentation.
* Understand the existing implementation.

During development:

* Reuse existing code.
* Write maintainable code.
* Keep files organized.

Before finishing:

* Run lint.
* Run type-check.
* Run tests.
* Run Playwright.
* Remove dead code.
* Remove duplication.
* Update documentation.

Never claim work is complete without verification.

---

# Definition of Done

Work is complete only when:

* Feature implemented
* Tests passing
* Build passing
* Lint passing
* Type-check passing
* Documentation updated
* Security reviewed
* No dead code
* No duplicate logic
* Ready for production

---

# Guiding Principle

> **Every commit should leave the codebase more secure, more maintainable, and more aligned with the mission of helping people grow closer to Christ.**
