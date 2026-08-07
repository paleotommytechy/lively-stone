# COMPONENT_GUIDELINES.md

# Component Guidelines

## Purpose

This document defines how UI components are designed, organized, reused, and maintained across the Lively Stones Platform.

The objective is consistency, maintainability, accessibility, and developer productivity.

---

# Design Principles

Every component should be:

* Reusable
* Accessible
* Typed
* Responsive
* Composable
* Well documented
* Tested

Never build a new component when an existing one can be extended.

---

# Component Hierarchy

```text
UI
│
├── Base Components
├── Form Components
├── Layout Components
├── Feedback Components
├── Feature Components
└── Page Components
```

---

# Folder Structure

```text
components/
│
├── ui/
├── forms/
├── layout/
├── navigation/
├── bible/
├── prayer/
├── community/
├── admin/
└── shared/
```

Keep business-specific components outside `ui/`.

---

# Naming Convention

Use PascalCase.

Examples:

* Button
* UserAvatar
* PrayerCard
* BibleReader
* CommunityPost

Avoid abbreviations.

---

# Base Components

Reusable primitives:

* Button
* Card
* Badge
* Avatar
* Dialog
* Sheet
* Tabs
* Alert
* Dropdown
* Input
* Textarea
* Select
* Checkbox
* Skeleton
* Tooltip

Prefer **shadcn/ui** over custom implementations.

---

# Component Rules

Each component should:

* Have one responsibility.
* Accept typed props.
* Support dark mode.
* Support loading state.
* Support disabled state.
* Forward refs where appropriate.

---

# Composition

Prefer composition over inheritance.

Good:

```tsx
<Card>
  <CardHeader />
  <CardContent />
</Card>
```

Avoid components with dozens of boolean props.

---

# Props

Prefer explicit props.

Good:

```tsx
<Button variant="default" size="lg" />
```

Avoid:

```tsx
<Button primary rounded big />
```

---

# State

UI components should not own business logic.

Business logic belongs in:

* Hooks
* Services
* Server actions
* Feature modules

---

# Forms

Use:

* React Hook Form
* Zod
* Controlled validation

Never duplicate validation rules.

---

# Icons

Use only:

* Lucide React

Maintain consistent sizing.

---

# Accessibility

Every interactive component must support:

* Keyboard navigation
* Focus indicators
* ARIA labels
* Screen readers

Accessibility is mandatory.

---

# Performance

Avoid:

* Unnecessary re-renders
* Deep prop drilling
* Large component trees

Use lazy loading where appropriate.

---

# Testing

Every shared component should include:

* Rendering test
* Accessibility check
* Interaction test

Critical flows should also have Playwright coverage.

---

# Documentation

Each reusable component should include:

* Purpose
* Props
* Example usage
* Accessibility notes

---

# Don't

* Duplicate components.
* Mix business logic with UI.
* Hardcode colors.
* Hardcode permissions.
* Ignore loading states.

---

# Do

* Reuse components.
* Prefer composition.
* Keep components small.
* Write predictable APIs.
* Follow the Design System.

---

# Product Principle

> **A component should solve one problem well, remain reusable, and never surprise the developer using it.**
