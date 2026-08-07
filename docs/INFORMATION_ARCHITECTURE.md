# INFORMATION_ARCHITECTURE.md

# Information Architecture

## Purpose

This document defines the overall structure of the Lively Stones Platform.

It establishes how information, pages, navigation, and features are organized to create a simple, scalable, and intuitive user experience.

The architecture follows one principle:

> **Organize around the disciple's journey, not around ministry departments.**

---

# Platform Structure

The platform consists of three major applications:

```text
Lively Stones Platform
│
├── Public Website
├── Disciple Portal
└── Admin Portal
```

Each application has a different purpose while sharing the same authentication system and design language.

---

# 1. Public Website

Purpose:

Introduce visitors to the ministry and encourage them to become part of the community.

### Main Navigation

* Home
* About
* Teachings
* Events
* Community
* Contact
* Login

### Public Pages

```
/

About

Events

Event Details

Teachings

Teaching Details

Blog (Future)

Contact

Privacy Policy

Terms

Login

Register
```

Visitors should never see internal ministry tools.

---

# 2. Disciple Portal

Purpose:

Support the disciple's daily spiritual growth, apostolic doctrine, spiritual disciplines, and consistency.

### Responsive Navigation Architecture

The Disciple Portal features an intentional responsive navigation architecture:
- **Desktop Expanded (272px)**: Persistent dark translucent sidebar with grouped navigation categories, active status indicators, disciple profile badge, weekly streak counter, and collapse control.
- **Desktop/Tablet Collapsed (80px)**: Compact icon-only rail with floating tooltips, active badges, and smooth transition.
- **Mobile (< 768px)**: Compact mobile top header with hamburger toggle, streak badge, and an iOS-style slide-in navigation drawer with rounded surfaces, touch targets >= 44px, and safe-area padding.

### Grouped Navigation Hierarchy

```text
Disciple Portal
├── Core & Discipleship
│   ├── Overview / Dashboard (/student/dashboard)
│   ├── Growth Roadmap (/student/journey)
│   └── Foundation & Orientation (/student/onboarding)
├── Spiritual Disciplines
│   ├── Scripture & Exegesis (/student/bible)
│   ├── Upper Room Prayer (/student/prayer)
│   └── Apostolic Teachings (/student/teachings)
├── Gatherings & Faithfulness
│   ├── Attendance & Streak (/student/attendance)
│   └── Convocations & Gatherings (/student/events)
└── Apostolic Community
    ├── Community Feed (/student/community)
    ├── Apostolic Q&A Desk (/student/questions)
    └── Share Insight Cards (/student/share-cards)
```

---

# Home

Daily spiritual journey.

Contains:

* Today's Verse
* Continue Bible Reading
* Prayer Focus
* Devotional
* Upcoming Events
* Continue Learning
* Community Updates

---

# Materials

Organized as:

```
Materials

├── Bible Studies

├── Courses

├── Sermons

├── Assignments

├── Downloads

└── Bookmarks
```

---

# Community

```
Community

├── Feed

├── Prayer Requests

├── Testimonies

├── Discussions

├── Small Groups (Future)

└── Search
```

---

# Notifications

```
Notifications

Unread

Read

Settings
```

Notifications should remain simple.

---

# Profile

```
Profile

Overview

Edit Profile

Growth

Achievements

Settings
```

Settings should not dominate the profile.

---

# 3. Admin Portal

Purpose:

Manage the ministry without interfering with the disciple experience.

Admin and Disciple interfaces must remain completely separate.

### Admin Navigation

```
Dashboard

Users

Departments

Content

Events

Community

Reports

Settings
```

---

# Users

Manage:

* Visitors
* Disciples
* Mentors
* Workers
* Administrators

---

# Departments

Manage ministry teams.

Examples:

* Media
* Bible Study
* Prayer
* Evangelism
* PRO
* Technical
* Follow-up

---

# Content

Manage:

* Teachings
* Courses
* Bible Studies
* Assignments
* Announcements

---

# Reports

Examples:

* Attendance
* Bible Engagement
* Community Activity
* Course Progress
* Volunteer Participation

---

# Cross-Cutting Services

These services support every application.

```
Authentication

Notifications

Search

File Storage

Analytics

Settings

Audit Logs
```

---

# Search Strategy

Users should search content—not pages.

Search should include:

* Teachings
* Bible Studies
* Courses
* Events
* Community Posts

---

# Navigation Principles

* Maximum five primary items for disciples.
* Consistent navigation across devices.
* Mobile-first.
* Clear page hierarchy.
* No hidden critical features.
* No duplicate navigation paths.

---

# Future Expansion

The architecture should support future modules without major restructuring.

Examples:

* Mobile App
* Podcast
* Giving
* AI Assistant
* Live Streaming
* Church Branches
* Multi-Ministry Support

---

# Guiding Principle

> **Every page should help a disciple grow, not simply display information.**
