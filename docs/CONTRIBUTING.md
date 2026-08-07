# CONTRIBUTING.md

# Contributing Guide

## Purpose

Defines how contributors and AI agents should work on the project.

---

## Workflow

```text
Issue

↓

Feature Branch

↓

Development

↓

Testing

↓

Pull Request

↓

Review

↓

Merge
```

---

## Branch Naming

* feature/*
* fix/*
* hotfix/*
* docs/*
* refactor/*
* chore/*

---

## Commit Format

```text
feat:

fix:

docs:

refactor:

test:

chore:
```

Keep commits focused.

---

## Before Coding

* Read AGENTS.md
* Read related documentation
* Understand existing implementation
* Search for reusable code

---

## Development Rules

* Reuse components.
* Keep functions small.
* Write TypeScript.
* Follow Design System.
* Follow RBAC rules.

---

## Before Opening PR

Verify:

* Build passes
* ESLint passes
* Type check passes
* Tests pass
* Playwright passes
* Documentation updated

---

## Code Review

Review for:

* Simplicity
* Security
* Performance
* Accessibility
* Documentation
* Tests

---

## Don't

* Commit secrets
* Leave dead code
* Duplicate logic
* Ignore failing CI
* Merge without review

---

## Do

* Write readable code
* Remove unused files
* Update documentation
* Keep PRs small

---

## Principle

> Every contribution should improve the project, not simply add code.
