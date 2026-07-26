# AGENTS.md

## Project: Lively Stones International Network — School of Tyrannus Prototype

## 1. Project Context

Build a polished, modern, visually impressive frontend prototype for **Lively Stones International Network**, a Christian ministry focused on discipleship, spiritual growth, evangelism, and kingdom impact.

The ministry's primary discipleship class is called **School of Tyrannus**, convened by **Saint Abraham Babatunde**.

The prototype is intended to demonstrate how technology can support the ministry's existing discipleship activities and expand its reach. This is a **frontend-only prototype** for demonstration purposes.

There is currently **no database, backend, authentication service, or production API**.

The prototype will be deployed to **Vercel**.

Use realistic mock data and local application state to simulate all major interactions and workflows.

---

## 2. Core Vision

The platform should communicate this discipleship journey:

**Learn → Grow → Live → Serve → Disciple → Multiply**

The platform should feel like a serious digital discipleship ecosystem, not simply a church website or LMS.

The goal is to demonstrate how the platform could help:

* Preserve and organize teachings
* Help students consistently engage with discipleship
* Track attendance and learning progress
* Provide quizzes and assignments
* Allow students to ask questions
* Build a healthy discipleship community
* Encourage students to share biblical insights
* Expand the reach of teachings through social sharing
* Support events, conventions, retreats, and evangelism
* Document kingdom impact
* Encourage discipleship multiplication

---

## 3. Important Ministry Context

Use these details throughout the prototype where appropriate:

**Ministry:** Lively Stones International Network

**Discipleship Class:** School of Tyrannus

**Convener:** Saint Abraham Babatunde

**SSGI:** Secondary School Gospel Invasion

Between late October and November 2025, Lively Stones International Network conducted a Secondary School Gospel Invasion (SSGI) across Ekiti State.

The prototype may showcase this as a Kingdom Impact / Outreach feature using mock statistics and clearly fictionalized demonstration data where exact numbers are unavailable.

Do not invent real attendance numbers, conversion numbers, or testimonies and present them as factual.

---

# 4. Technology

Use:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React
* Mock data
* Local React state
* Vercel-compatible architecture

Do not introduce:

* Supabase
* Firebase
* PostgreSQL
* External database
* Real authentication
* Real payment systems
* Production API integrations

The prototype should be designed so that a backend can be added later without requiring a complete frontend rewrite.

---

# 5. Design Direction

The design must be:

* Modern
* Premium
* Cinematic
* Warm
* Spiritual but not cliché
* Visually rich
* Elegant
* Responsive
* Mobile-first
* Highly polished
* Suitable for a modern global Christian ministry

Avoid generic church website aesthetics.

Avoid excessive:

* Gold gradients
* Cross icons everywhere
* Stock-photo-heavy layouts
* Overly decorative religious imagery
* Cheap-looking gradients
* Excessive glassmorphism
* Over-animation

Use strong typography, whitespace, editorial layouts, subtle gradients, carefully selected imagery, elegant cards, and meaningful motion.

The visual identity should communicate:

**Discipleship + Knowledge + Community + Kingdom Impact**

Use a coherent design system across:

* Public website
* Student dashboard
* Learning experience
* Community
* Admin dashboard

Use shadcn/ui components wherever appropriate.

Use Lucide React icons instead of manually created SVG icons.

---

# 6. Application Structure

Create three major experiences.

## A. Public Ministry Website

Routes/pages should include:

* Home
* About
* School of Tyrannus
* Teachings
* Teaching Details
* Events
* Kingdom Impact
* SSGI
* Community
* Join School of Tyrannus

The public website should communicate the ministry's vision and invite visitors into discipleship.

---

## B. Student Experience

Create a realistic student dashboard.

Suggested pages:

* Dashboard
* My Discipleship Journey
* Teachings
* Teaching Details
* Quizzes
* Assignments
* Attendance
* Questions & Answers
* Community
* Shareable Insights
* Events
* Notifications
* Profile

The dashboard should feel personalized.

Example:

"Good evening, Ifeoluwa."

Show:

* Current discipleship progress
* Weekly consistency
* Next School of Tyrannus session
* Latest teaching
* Pending assignment
* Quiz progress
* Attendance
* Recent community activity

---

## C. Admin / Leadership Experience

Create a simulated admin dashboard.

Suggested pages:

* Overview
* Students
* Teachings
* Create Teaching
* Quiz Management
* Assignment Management
* Attendance
* Questions
* Community Moderation
* Share Cards
* Events
* Kingdom Impact
* SSGI
* Settings

Use mock data and local state to simulate CRUD functionality.

---

# 7. Teaching System

Create realistic mock School of Tyrannus teachings.

Each teaching should contain:

* Title
* Description
* Date
* Speaker
* Topic
* Scripture references
* Key points
* Summary
* Telegram link
* Audio/video placeholder
* Quiz
* Assignment
* Related teachings

Students should be able to:

* Browse teachings
* Search teachings
* Filter teachings
* Open teaching details
* Read the summary
* View key points
* Open the Telegram message
* Take a quiz
* View assignment
* Mark teaching as completed

Use realistic mock content instead of lorem ipsum.

---

# 8. Telegram Integration Simulation

Do not integrate the real Telegram API.

Each teaching should have a mock "Read on Telegram" button.

Use a placeholder Telegram URL.

The button should simulate the future workflow where School of Tyrannus teachings currently shared through Telegram are connected to the structured learning platform.

Make it visually clear that Telegram is currently an external resource.

---

# 9. Quiz System

Build a fully interactive mock quiz experience.

Students should be able to:

* Start quiz
* Answer multiple-choice questions
* Navigate questions
* Submit quiz
* See score
* See correct/incorrect answers
* Retry quiz

Use local state.

The quiz results should update the student's mock progress.

Include loading states, empty states, success states, and error states where appropriate.

---

# 10. Assignment System

Create a simulated assignment workflow.

Students should be able to:

* View assignment
* Read instructions
* See deadline
* Submit text response
* Simulate file upload
* Submit assignment
* See submission status

Use mock local state.

No real file upload is required.

---

# 11. Attendance

Create an attendance interface.

Students should see:

* Attendance percentage
* Sessions attended
* Missed sessions
* Attendance history
* Current consistency

Admin should see:

* Student attendance
* Session attendance
* Attendance statistics

Use mock data.

Create visually meaningful charts or progress indicators.

---

# 12. Discipleship Journey

Create a visually impressive journey/progress experience.

The journey should communicate:

**Learn → Grow → Live → Serve → Disciple → Multiply**

Use a timeline, pathway, or interactive journey map.

Students should see:

* Completed modules
* Current module
* Upcoming modules
* Progress percentage
* Milestones

This should be one of the strongest visual sections of the prototype.

---

# 13. Questions & Answers

Create a question system.

Students can:

* Ask questions
* Browse questions
* Search questions
* View answers
* Like/helpful-mark answers

Admin can:

* View questions
* Answer questions
* Mark questions as answered
* Feature important questions

Use mock local state.

---

# 14. Community

Create a simulated discipleship community.

Students can:

* View posts
* Create posts
* Share testimonies
* Share insights
* Ask questions
* React to posts
* Comment

Use mock data.

Focus on creating a healthy discipleship environment rather than a generic social media clone.

Include categories such as:

* Testimony
* Insight
* Prayer
* Question
* Encouragement

---

# 15. Shareable Teaching Insight Cards

This is a key feature.

Create a **Shareable Insights / Teaching Graphics** system.

The goal is to transform key insights from School of Tyrannus teachings into visually appealing social media graphics.

The workflow should be:

**Teaching → Key Points → Select Template → Generate Preview → Download → Share**

Admin should be able to:

* Select a teaching
* Enter a title
* Add 1–5 key points
* Add scripture reference
* Add speaker name
* Select a design template
* Preview the graphic
* Generate a share card
* Download the card

Students should be able to:

* Browse approved share cards
* Preview cards
* Download cards
* Share cards using the browser's native share functionality where supported

Create at least 3 visually distinct templates:

### Template 1 — Editorial

Minimal, elegant, typography-focused.

### Template 2 — Scripture

Large scripture reference with strong visual hierarchy.

### Template 3 — Insight

Bold key teaching point with ministry branding.

The cards should include:

* Lively Stones International Network
* School of Tyrannus
* Teaching title
* Key insight
* Scripture reference
* Saint Abraham Babatunde where appropriate

Use browser/client-side functionality to simulate image generation/download if practical.

If full image generation is too complex for the prototype, create polished HTML/CSS previews and provide a simulated download interaction.

Do not require a backend.

This feature should feel like a major part of the platform because it supports organic awareness and evangelism.

---

# 16. Kingdom Impact

Create a visually compelling Kingdom Impact section.

Include:

* Annual Convention
* Retreats
* Evangelism
* School outreach
* SSGI
* Testimonies
* Impact stories

Create a featured SSGI section:

**Secondary School Gospel Invasion (SSGI)**

Show:

* Ekiti State
* Late October – November 2025
* Outreach campaign
* Schools reached
* Volunteers
* Stories and media placeholders

Do not present invented statistics as verified facts.

Use labels such as:

"Prototype Data"

or

"Impact statistics will be added by administrators."

The purpose is to demonstrate how future outreach activities could be documented and shared.

---

# 17. Annual Convention

Create an event experience for the annual convention.

Include:

* Event details
* Date
* Location
* Theme
* Speakers
* Schedule
* Registration
* Countdown
* Gallery
* Retreat information

Use mock data.

The event should feel like a major ministry gathering.

---

# 18. Consistency System

Create a healthy consistency system.

Show:

* Weekly attendance
* Learning streak
* Completed teachings
* Quiz completion
* Assignment completion
* Engagement

Use language that encourages rather than pressures.

Avoid making spiritual growth feel like a competitive game.

Do not use public leaderboards for spiritual performance.

Use encouraging messages such as:

"Keep growing."

"Your consistency is building a strong foundation."

"Continue your discipleship journey."

---

# 19. Notifications

Simulate notifications for:

* New teaching
* Upcoming School of Tyrannus session
* Assignment deadline
* Quiz reminder
* Answer to question
* New event
* Community activity

Use local mock data.

---

# 20. Mock Data

Create a centralized mock data layer.

Do not scatter hardcoded data throughout components.

Use files such as:

```text
src/
  data/
    mock-teachings.ts
    mock-students.ts
    mock-quizzes.ts
    mock-assignments.ts
    mock-attendance.ts
    mock-community.ts
    mock-events.ts
    mock-share-cards.ts
    mock-outreach.ts
```

Use TypeScript types/interfaces.

The future backend should be able to replace these data sources cleanly.

---

# 21. Prototype Interaction Requirements

The prototype must feel functional.

Implement:

* Navigation
* Search
* Filters
* Tabs
* Modals
* Drawers
* Forms
* Quiz interactions
* Assignment submission simulation
* Attendance views
* Community posting simulation
* Question submission
* Admin CRUD simulation
* Share-card preview
* Share-card download simulation
* Toast notifications
* Loading states
* Empty states
* Error states

Avoid dead buttons.

Every visible interactive element should either work or clearly indicate that it is a prototype feature.

---

# 22. Responsive Design

The platform must work beautifully on:

* Mobile
* Tablet
* Desktop

The student experience should prioritize mobile usability.

The admin dashboard can be optimized for desktop while remaining responsive.

Do not simply shrink the desktop UI for mobile.

Create intentional responsive layouts.

---

# 23. Navigation

Use a clear distinction between:

### Public navigation

Home
About
School of Tyrannus
Teachings
Events
Kingdom Impact
Join

### Student navigation

Dashboard
Journey
Teachings
Assignments
Community
Questions
Share Insights
Events

### Admin navigation

Overview
Students
Teachings
Quizzes
Assignments
Attendance
Questions
Community
Share Cards
Events
Kingdom Impact

---

# 24. UX Principles

Prioritize:

* Clarity
* Accessibility
* Visual hierarchy
* Fast navigation
* Meaningful feedback
* Consistency
* Mobile usability

Use toast notifications for important actions.

Use confirmation dialogs for destructive actions.

Use skeleton loading states where appropriate.

Use empty states that explain what the user can do next.

---

# 25. Code Quality

Use:

* TypeScript strict mode
* Reusable components
* Clear component naming
* Small focused components
* Reusable UI primitives
* Consistent folder structure
* No unnecessary duplication

Avoid:

* Giant components
* Hardcoded repeated UI
* Inline mock data inside complex components
* Unused dependencies
* Console errors
* Broken links
* Placeholder lorem ipsum

---

# 26. Important Prototype Boundary

This is a demonstration prototype.

Do not spend time implementing:

* Real authentication
* Real database
* Real Telegram API
* Real file storage
* Real email
* Real push notifications
* Payment integration
* Production moderation
* Production analytics

Prioritize:

**Visual quality + user experience + believable interactions + demonstration of the vision.**

---

# 27. Final Demo Flow

The prototype should allow the following demo story:

1. Visitor lands on Lively Stones International Network.
2. Visitor discovers the School of Tyrannus.
3. Visitor sees the ministry's discipleship vision.
4. Visitor explores previous teachings.
5. Visitor opens a teaching.
6. Visitor follows the Telegram link.
7. Student enters the student dashboard.
8. Student sees their discipleship journey.
9. Student completes a quiz.
10. Student submits an assignment.
11. Student checks attendance.
12. Student asks a question.
13. Student participates in the community.
14. Student discovers a shareable teaching insight.
15. Student downloads the social media graphic.
16. Student shares the teaching insight.
17. Admin creates a new teaching.
18. Admin extracts key points.
19. Admin creates a share card.
20. Admin reviews students and engagement.
21. Visitor explores Kingdom Impact.
22. Visitor sees the SSGI outreach across Ekiti State.
23. Visitor discovers the annual convention.
24. Visitor is invited to join the discipleship journey.

The entire prototype should communicate one central idea:

> **This is not just a website for a ministry. It is a digital environment designed to help people encounter truth, grow in Christ, live out the Word, and become disciples who make disciples.**

Build the prototype as if it will be presented to the ministry's convener for the first time.

The final result should feel polished enough to make the vision immediately understandable and compelling.
