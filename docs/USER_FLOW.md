# USER_FLOW.md

# User Flow

## Purpose

This document defines the navigation, screen transitions, and interaction flows for the Lively Stones Platform.

The goal is to create a simple, predictable, and distraction-free experience that supports discipleship rather than overwhelming users with features.

---

# User Types

The platform supports five primary user groups:

* Visitor
* Disciple
* Mentor
* Ministry Worker
* Administrator

Each role has a unique journey while sharing a consistent design language.

---

# High-Level Flow

```text
Visitor
   │
   ▼
Landing Page
   │
   ▼
Login / Register
   │
   ▼
Authentication
   │
   ▼
Profile Onboarding
   │
   ▼
Disciple Home
   │
   ├── Bible
   ├── Materials
   ├── Community
   ├── Notifications
   └── Profile
```

The application should never redirect a newly authenticated user directly to the main dashboard unless onboarding is complete.

---

# Public Website Flow

```text
Landing Page
    │
    ├── About
    ├── Events
    ├── Teachings
    ├── Contact
    ├── Community
    └── Login
```

Primary Call-to-Action:

* Join the Community
* Start Your Journey

Avoid multiple competing calls-to-action.

---

# Authentication Flow

```text
Login

↓

Authenticate

↓

Profile Complete?

↓

NO
↓

Onboarding

↓

Complete Profile

↓

Disciple Home

--------------------

YES

↓

Disciple Home
```

Authentication should only verify identity.

Onboarding prepares the disciple for meaningful engagement.

---

# First-Time User Flow

```text
Register

↓

Verify Email

↓

Create Profile

↓

Select Interests

↓

Meet Your Community

↓

Today's Scripture

↓

Disciple Home
```

The first session should immediately encourage a spiritual habit.

---

# Returning User Flow

```text
Login

↓

Today's Home

↓

Continue Yesterday's Progress

↓

Complete Today's Journey
```

The home screen should answer one question:

> **What should I do next today?**

---

# Disciple Navigation

Desktop Navigation

* Home
* Materials
* Community
* Notifications
* Profile
* Logout

Mobile Navigation

Bottom Navigation

* Home
* Materials
* Community
* Profile

Notifications remain accessible from the app bar.

Additional pages should be reached from these primary destinations rather than cluttering the navigation.

---

# Home Flow

The Home page is a daily spiritual dashboard.

Order of content:

1. Welcome message
2. Today's Verse
3. Continue Bible Reading
4. Prayer Focus
5. Daily Devotional
6. Upcoming Events
7. Continue Learning
8. Community Highlights

The page should feel like a daily guide, not an analytics dashboard.

---

# Bible Flow

```text
Home

↓

Continue Reading

↓

Read Scripture

↓

Highlight

↓

Take Notes

↓

Mark Complete

↓

Return Home
```

Reading progress should be saved automatically.

---

# Prayer Flow

```text
Home

↓

Prayer

↓

Today's Focus

↓

Journal

↓

Prayer Requests

↓

Answered Prayers
```

Encourage reflection rather than rushing through tasks.

---

# Materials Flow

```text
Materials

↓

Categories

↓

Series

↓

Lesson

↓

Notes

↓

Assignment

↓

Completed
```

Each completed lesson should naturally lead to the next.

---

# Community Flow

```text
Community

↓

Feed

↓

Discussion

↓

Comment

↓

Encourage

↓

Pray

↓

Return
```

Community interactions should prioritize encouragement and meaningful conversations.

---

# Notification Flow

Notifications should be actionable.

Examples:

* Continue today's reading.
* New teaching available.
* Mentor sent encouragement.
* Event reminder.
* Prayer request update.

Selecting a notification should navigate directly to the relevant page.

---

# Profile Flow

```text
Profile

↓

View Growth

↓

Update Information

↓

Reading Progress

↓

Prayer Progress

↓

Achievements

↓

Settings
```

The profile represents the disciple's journey, not merely account details.

---

# Mentor Flow

```text
Mentor Dashboard

↓

Assigned Disciples

↓

View Progress

↓

Send Encouragement

↓

Recommend Resources

↓

Schedule Follow-up
```

Mentors should spend more time guiding people than managing data.

---

# Ministry Worker Flow

Department leaders should only access tools relevant to their responsibilities.

Examples:

Media

* Upload teachings
* Manage media library

Prayer

* Review prayer requests
* Publish prayer focus

Bible Study

* Publish materials
* Create assignments

PRO

* Announcements
* Events
* Public content

Avoid exposing unnecessary administrative functionality.

---

# Administrator Flow

```text
Admin Login

↓

Dashboard

↓

Users

Departments

Events

Content

Community

Reports

Settings
```

Administrative navigation should remain completely separate from the Disciple Portal.

---

# Error Flows

Every important workflow should include:

* Empty states
* Offline states
* Loading states
* Permission denied
* Resource not found
* Session expired

Users should always know what happened and how to recover.

---

# Navigation Principles

* Maximum of six primary navigation items.
* Never expose admin navigation to disciples.
* Keep the same navigation order across the platform.
* Avoid deeply nested menus.
* Prioritize mobile-first navigation.
* Every page should have one clear primary action.

---

# Success Criteria

A successful user flow should allow a disciple to:

* Sign up in under 3 minutes.
* Complete onboarding in under 5 minutes.
* Begin Bible reading within 30 seconds of logging in.
* Find any core feature within two clicks.
* Leave every session encouraged to continue growing spiritually.

---

# Product Principle

> **Navigation should remove friction, not create decisions. Every screen should make the next step obvious, purposeful, and spiritually meaningful.**
