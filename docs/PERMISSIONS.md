# PERMISSIONS.md

# Permission & Role Management

## Purpose

This document defines the authorization model for the Lively Stones Platform.

The permission system must be:

* Secure
* Flexible
* Scalable
* Auditable
* Easy to maintain

Authorization determines **what a user can do**, not who they are.

Authentication and authorization must always remain separate concerns.

---

# Design Principles

The platform uses **Role-Based Access Control (RBAC)** with fine-grained permissions.

Rules:

* Users have one or more Roles.
* Roles contain Permissions.
* Departments organize ministry service.
* Permissions are enforced server-side.
* UI only reflects permissions—it never grants them.

Never hardcode role names in application logic.

Always check permissions.

---

# Permission Hierarchy

```text
Super Admin
      │
      ▼
Administrator
      │
      ▼
Department Head
      │
      ▼
Department Member
      │
      ▼
Mentor
      │
      ▼
Disciple
```

Higher roles inherit lower permissions unless explicitly restricted.

---

# Roles

## Visitor

Unauthenticated user.

Permissions:

* View public pages
* Register
* Login
* View public events
* Read public teachings

---

## Disciple

Default authenticated role.

Permissions:

* View Home
* Read Bible
* Access Materials
* Join Community
* Submit Assignments
* Update Profile
* Receive Notifications
* Register for Events
* Create Prayer Requests

Cannot:

* Manage users
* Publish content
* Moderate community
* Change permissions

---

## Mentor

Supports assigned disciples.

Additional permissions:

* View assigned disciples
* Send encouragement
* Recommend learning resources
* Track disciple progress
* Review assignments
* Schedule follow-ups

Mentors cannot modify user roles.

---

## Department Member

Users serving within ministry departments.

Permissions depend on department.

Example:

Media Team

* Upload media
* Edit media
* Delete own uploads

Prayer Team

* Publish prayer focus
* Moderate prayer requests

Bible Study

* Publish study materials
* Create assignments
* Manage courses

PRO

* Publish announcements
* Manage public content
* Manage events

Technical Team

* Manage technical resources
* View monitoring tools

Department Members only manage resources belonging to their department.

---

## Department Head

Includes all Department Member permissions.

Additional permissions:

* Approve department content
* Assign department tasks
* Manage department members
* View department analytics
* Archive department resources

Cannot manage other departments.

---

## Administrator

Responsible for platform operations.

Permissions:

* Manage users
* Manage departments
* Manage events
* Moderate community
* Publish content
* Manage reports
* View analytics
* Assign roles (except Super Admin)

Administrators cannot modify system ownership.

---

## Super Admin

Platform owner.

Unrestricted access.

Responsibilities:

* Manage administrators
* Configure platform
* Manage permissions
* View audit logs
* Security management
* System configuration
* Emergency actions

Every Super Admin action must be audited.

---

# Permission Categories

## User Management

Examples:

```text
users.view

users.create

users.edit

users.delete

users.suspend

users.restore
```

---

## Role Management

```text
roles.view

roles.assign

roles.remove
```

---

## Department Management

```text
departments.view

departments.create

departments.edit

departments.archive
```

---

## Content Management

```text
content.view

content.create

content.edit

content.publish

content.archive

content.delete
```

---

## Event Management

```text
events.create

events.edit

events.publish

events.cancel

events.attendance
```

---

## Community Management

```text
community.view

community.post

community.comment

community.moderate

community.delete
```

---

## Learning Management

```text
courses.create

courses.edit

courses.publish

assignments.create

assignments.grade
```

---

## Prayer Management

```text
prayer.publish

prayer.review

prayer.archive
```

---

## Reports

```text
reports.view

reports.export
```

---

## System

```text
settings.manage

audit.view

permissions.manage
```

---

# Department-Based Access

Departments do **not** define permissions.

Departments define **scope**.

Example:

Media Team

Can edit:

✔ Media content

Cannot edit:

✖ Bible studies

✖ User accounts

✖ Reports

---

# Ownership Rules

Users always own:

* Their profile
* Their notes
* Their bookmarks
* Their prayer journal
* Their comments

Users may edit only resources they own unless granted elevated permissions.

---

# Row Level Security (RLS)

Every protected table must enforce RLS.

Examples:

Disciple

* Reads own profile

Mentor

* Reads assigned disciples

Department Head

* Reads department resources

Admin

* Reads administrative resources

Never rely solely on frontend permission checks.

---

# Permission Resolution

The application resolves permissions in this order:

```text
Authenticated?

↓

Role

↓

Permissions

↓

Department Scope

↓

Ownership

↓

RLS Policy

↓

Access Granted
```

Every step must succeed.

---

# UI Behaviour

Navigation must be generated from permissions.

Example:

Media user sees:

* Media Library

Bible Study user sees:

* Bible Studies

Prayer leader sees:

* Prayer Dashboard

Avoid showing inaccessible pages.

Do not display disabled menu items unless they provide instructional value.

---

# Audit Requirements

The following actions must always be logged:

* Role assignment
* Role removal
* Permission changes
* User suspension
* Department changes
* Content publication
* Content deletion
* Settings updates

Audit logs are immutable.

---

# Future Expansion

The permission model must support:

* Multi-campus ministries
* Regional administrators
* Branch pastors
* External volunteers
* Temporary permissions
* Time-limited permissions
* Feature flags

without changing the core architecture.

---

# Engineering Rules

Never:

* Check role names directly in UI components.
* Hardcode `"admin"` or `"super_admin"` strings.
* Store permissions in frontend state as the source of truth.
* Trust client-provided roles.

Always:

* Validate permissions server-side.
* Use reusable permission helpers.
* Cache permission lookups where appropriate.
* Log privileged operations.

---

# Guiding Principle

> **Roles describe responsibility. Permissions define capability. Departments define context. Ownership defines boundaries. Authorization is enforced on the server—not assumed by the client.**
