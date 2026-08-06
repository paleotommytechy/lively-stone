# AGENT_UPGRADE.md
# Living Stones International Network (LSIN)
## Production Upgrade Specification v1.0

> Objective:
Transform this prototype into a production-ready application capable of serving the first release with:
- 100 Students
- 20 Admins
- 150 Public Visitors
while maintaining excellent performance, scalability, accessibility, security and maintainability.

This is NOT a redesign from scratch.

Upgrade the current application while preserving its product vision.

---

# PRODUCT VISION

Living Stones International Network is NOT just a church website.

It is a Digital Discipleship Platform.

The application should feel closer to:

- Duolingo
- Notion
- Spotify
- Headspace
- Apple Fitness
- Linear

than a traditional ministry website.

The application must inspire growth, engagement and consistency.

Every design decision should encourage users to continue learning and returning daily.

---

# PRIMARY USERS

## Public Users

Can

- browse teachings
- events
- testimonies
- about ministry
- contact
- register
- share content

Cannot

- view student dashboard
- assignments
- quizzes

---

## Students

Can

- access teachings
- take quizzes
- submit assignments
- ask questions
- view progress
- receive certificates
- receive notifications
- bookmark teachings

---

## Admins

Can

- manage users
- upload teachings
- manage events
- answer questions
- manage assignments
- moderate discussions
- manage certificates
- analytics dashboard

---

# TARGET SCALE

First production release

100 Students

20 Admins

150 Public Users

The architecture must allow scaling to

10,000+

users without major refactoring.

---

# CORE PRINCIPLES

The application should feel

Fast

Beautiful

Modern

Premium

Simple

Minimal

Warm

Spirit-filled

Never cluttered.

---

# ROUTING

Remove manual route switching.

Do NOT use giant switch statements.

Implement

Next.js App Router

or

React Router (if remaining SPA)

Every screen must have a real route.

Example

/public

/about

/events

/teachings

/student/dashboard

/student/teachings

/student/profile

/student/certificate

/admin/dashboard

/admin/students

/admin/events

/admin/messages

/admin/settings

---

# MOBILE EXPERIENCE

This is one of the highest priorities.

The mobile experience must NOT simply be the desktop layout compressed.

Design it as if building a native iOS application.

Requirements

Bottom Navigation

Floating Action Button where appropriate

Large touch targets

Rounded cards

Native feeling transitions

Swipe gestures where useful

Smooth animations

Glassmorphism where appropriate

Blur navigation

Sticky bottom navigation

Large typography

Excellent spacing

Proper safe-area support

Mobile interactions should resemble

Apple Music

Instagram

Notion Mobile

Headspace

Duolingo

Users should forget they are inside a browser.

---

# DESKTOP EXPERIENCE

Desktop should feel

Professional

Minimal

Focused

Use

Sidebar navigation

Sticky headers

Keyboard shortcuts

Responsive cards

Large analytics

Fast filtering

---

# DESIGN SYSTEM

Create reusable components.

Required

Button

Input

Textarea

Select

Dropdown

Card

Modal

Drawer

Tabs

Tooltip

Toast

Badge

Avatar

Skeleton

Accordion

Dialog

Alert

Progress

Empty State

Error State

Loading State

Pagination

Data Table

Theme Toggle

All components should be reusable.

---

# UI FRAMEWORK

Use

shadcn/ui

lucide-react

Framer Motion

Tailwind CSS

Avoid unnecessary third-party UI libraries.

---

# ANIMATIONS

Implement tasteful animations.

Examples

Page transitions

Fade

Slide

Scale

Hover

Card lift

Loading shimmer

Button ripple

Micro interactions

No excessive animations.

Performance first.

---

# STATE MANAGEMENT

Separate concerns.

Server State

React Query / TanStack Query

UI State

Zustand

Authentication

Dedicated Auth Provider

Avoid massive Context providers.

---

# DATA LAYER

Create

services/

repositories/

hooks/

api/

types/

Never fetch directly inside components.

---

# PROJECT STRUCTURE

src/

app/

components/

features/

hooks/

providers/

services/

lib/

types/

utils/

constants/

styles/

assets/

---

# ERROR HANDLING

Implement

404

403

500

Offline

Retry

Network timeout

Permission denied

Session expired

Validation errors

Graceful error boundaries

---

# LOADING EXPERIENCE

Every async operation must have

Skeleton

Progress

Loading indicator

Optimistic updates where possible

---

# PERFORMANCE

Target

Lighthouse

Performance >95

Accessibility >95

SEO >95

Best Practices >95

CLS below 0.1

First Contentful Paint under 2s

Lazy load

Images

Routes

Heavy components

Memoize expensive operations

Avoid unnecessary re-renders

---

# ACCESSIBILITY

Support

Keyboard navigation

ARIA labels

Screen readers

Focus management

Color contrast

Reduced motion

Tab navigation

WCAG AA compliance

---

# SEO

Implement

Meta tags

Open Graph

Twitter cards

Sitemap

Robots

Structured Data

Canonical URLs

Dynamic metadata

---

# SECURITY

Prepare for production.

Implement

Authentication

Authorization

Protected routes

CSRF protection

XSS prevention

Rate limiting

Input validation

Output sanitization

Environment variable validation

Secure headers

Content Security Policy

No secrets in repository

No client-side admin logic

---

# AUTHENTICATION

Design abstraction for

Supabase Auth

Role Based Access

Student

Admin

Public

Future

Google

Apple

Email

Magic Link

---

# FORMS

Use

React Hook Form

Zod validation

Inline validation

Helpful errors

---

# NOTIFICATIONS

Toast

In-app notifications

Future push notifications

---

# SEARCH

Global search

Teachings

Students

Events

Questions

Scriptures

---

# DASHBOARDS

Student Dashboard

Continue learning

Recent teachings

Upcoming events

Assignments

Progress

Prayer focus

Achievements

Admin Dashboard

Analytics

User growth

Attendance

Assignments

Quiz completion

Recent activity

Content metrics

---

# ANALYTICS

Prepare analytics architecture.

Track

Daily Active Users

Teaching completion

Quiz scores

Assignment completion

Popular teachings

Search terms

Retention

---

# FUTURE AI

Design architecture for future AI.

Do NOT implement AI yet.

Create interfaces for

Teaching summary

Question answering

Scripture recommendations

Study assistant

Content generation

---

# CODE QUALITY

Strict TypeScript

No any

Reusable hooks

Small components

Proper naming

No duplicated logic

Lint clean

No console logs

No dead code

---

# DOCUMENTATION

Update

README

Architecture.md

Deployment.md

Environment.md

Folder structure

Component documentation

---

# TESTING

Testing is mandatory.

Do NOT finish until all tests pass.

Implement

## Unit Tests

Vitest

React Testing Library

## Integration Tests

API

Authentication

Routing

Dashboard

Forms

## End-to-End Tests

Playwright

Critical flows

Public navigation

Student login

Admin login

Assignment

Quiz

Logout

Responsive layouts

Mobile navigation

Desktop navigation

---

# QUALITY CHECKS

Run

Type Check

Lint

Build

Unit Tests

Integration Tests

Playwright

Accessibility Audit

Lighthouse

Bundle Analysis

Unused dependency detection

Dead code detection

---

# BUILD

Application must build successfully.

No warnings.

No TypeScript errors.

No ESLint errors.

---

# DEPLOYMENT

Prepare for

Vercel

Production

Environment variables

Build optimization

Compression

Caching

Image optimization

---

# DELIVERABLES

When finished provide

1. Summary of changes

2. Architecture improvements

3. Performance improvements

4. Security improvements

5. Accessibility improvements

6. Lighthouse results

7. Test results

8. Remaining recommendations

9. Production readiness score

10. Future roadmap

Do NOT stop after making visual improvements.

Your task is complete ONLY when the application is stable, maintainable, production-ready for the target user base, and all quality checks and automated tests pass successfully.