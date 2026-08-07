# DATABASE.md

# Database Architecture

## Purpose

This document defines the logical database architecture for the Lively Stones Platform.

The database is designed around **people and discipleship**, not pages or UI components.

The goal is to create a scalable, secure, and maintainable data model that supports future growth without frequent schema redesigns.

---

# Design Principles

The database should be:

* User-centric
* Normalized
* Extensible
* Secure
* Auditable
* Multi-role
* Analytics-friendly

Business logic belongs in the application layer, not in duplicated database structures.

---

# Core Domain Model

```text
User
 │
 ├── Profile
 ├── Roles
 ├── Departments
 ├── Mentor Relationship
 ├── Bible Progress
 ├── Prayer Life
 ├── Learning Progress
 ├── Community Activity
 ├── Event Attendance
 ├── Notifications
 └── Audit Logs
```

Every authenticated person begins as a **User**. Other entities extend the user rather than replacing it.

---

# Core Entities

## Users

Represents every authenticated account.

Stores only authentication and identity information.

Examples:

* email
* auth_provider
* status
* created_at

Never store application-specific profile information here.

---

## Profiles

Stores ministry-specific information.

Examples:

* display_name
* avatar
* biography
* phone
* gender
* date_of_birth
* location
* occupation
* fellowship
* onboarding_status

One User has one Profile.

---

## Roles

Defines system permissions.

Examples:

* Disciple
* Mentor
* Media
* Bible Study
* Prayer
* PRO
* Admin
* Super Admin

A user may have multiple roles.

Never hardcode roles in the application.

---

## Departments

Represents ministry teams.

Examples:

* Media
* Bible Study
* Prayer
* Evangelism
* Technical
* Follow-up
* Welfare

Users may belong to multiple departments.

---

## Mentor Relationships

Maps disciples to mentors.

Fields include:

* mentor_id
* disciple_id
* assigned_at
* active

One mentor can oversee many disciples.

A disciple has one active mentor at a time.

---

# Bible Module

## Reading Plans

Available reading plans.

Examples:

* One Year Bible
* New Testament
* Psalms
* Topical

---

## Bible Progress

Tracks reading activity.

Examples:

* plan
* book
* chapter
* completed
* completed_at
* streak_day

---

## Highlights

Stores highlighted verses.

---

## Bookmarks

Stores saved passages.

---

## Notes

Stores personal Scripture notes.

---

# Prayer Module

## Prayer Requests

Stores user prayer requests.

Status:

* Active
* Answered
* Archived

---

## Prayer Journal

Personal prayer entries.

Private by default.

---

## Prayer Partners

Relationship between praying users.

---

## Prayer Groups (Future)

Supports group prayer initiatives.

---

# Learning Module

## Courses

Teaching series.

---

## Lessons

Individual learning units.

---

## Enrollment

Connects users with courses.

---

## Lesson Progress

Tracks completion.

---

## Assignments

Learning activities.

---

## Assignment Submission

User responses.

---

# Community Module

## Posts

Community discussions.

---

## Comments

Replies.

---

## Reactions

Likes, encouragements, prayers.

Avoid multiple reaction tables.

---

## Tags

Topic organization.

---

## Reports

Moderation system.

---

# Events Module

## Events

Bible studies.

Prayer meetings.

Conferences.

Retreats.

---

## Registration

User registration.

---

## Attendance

Tracks participation.

---

# Notification Module

Stores:

* reminders
* announcements
* mentor messages
* prayer updates
* event reminders

Notifications should be categorized and expire when no longer relevant.

---

# Media Module

Stores:

* sermons
* videos
* audio
* PDFs
* images

Use Supabase Storage.

Store only metadata in PostgreSQL.

---

# Analytics Module

Stores calculated metrics such as:

* reading streak
* prayer streak
* attendance rate
* learning completion
* engagement score

Avoid recalculating expensive metrics on every request.

---

# Audit Logs

Every important administrative action should be logged.

Examples:

* role changes
* permission updates
* content deletion
* event creation
* profile edits

Audit logs must be immutable.

---

# Relationships

```text
User
 ├── Profile (1:1)
 ├── Roles (M:N)
 ├── Departments (M:N)
 ├── Mentor (M:1)
 ├── Bible Progress (1:M)
 ├── Prayer Requests (1:M)
 ├── Journal (1:M)
 ├── Courses (M:N)
 ├── Posts (1:M)
 ├── Events (M:N)
 ├── Notifications (1:M)
 └── Audit Logs (1:M)
```

---

# Soft Deletes

Prefer soft deletes for:

* users
* posts
* teachings
* events
* courses

Maintain historical integrity where appropriate.

---

# Row Level Security

Every table containing user data must implement Supabase Row Level Security (RLS).

Policies should enforce:

* users access their own data
* mentors access assigned disciples where permitted
* department leaders access departmental resources
* admins access administrative resources
* public users access only explicitly published content

---

# Naming Conventions

Use:

* singular table names
* UUID primary keys
* snake_case columns
* created_at
* updated_at
* deleted_at (when applicable)

Avoid inconsistent naming.

---

# Future Scalability

The schema should support:

* Multiple ministries
* Multiple campuses
* Branches
* Small groups
* Internationalization
* Mobile applications
* API integrations
* AI-powered recommendations

without requiring major structural changes.

---

# Guiding Principle

> **The database should model discipleship, relationships, and ministry—not the current UI. Features may change, but the domain should remain stable.**
