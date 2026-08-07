# DESIGN_SYSTEM.md

# Design System

## Purpose

The Lively Stones Design System establishes the visual language, interaction patterns, and user experience principles for every part of the platform.

The objective is to create an experience that feels:

* Peaceful
* Premium
* Modern
* Accessible
* Delightful
* Spiritually focused

Every screen should remove friction and help disciples focus on Christ.

---

# Design Philosophy

The interface should never compete with the content.

God's Word, prayer, teachings, and community are the focus—not flashy UI.

The design should communicate:

* Clarity over decoration
* Calm over noise
* Simplicity over complexity
* Beauty through consistency

---

# Design Inspiration

The platform should combine the strengths of:

* Apple → Clean layouts & polished interactions
* Notion → Calm reading experience
* Linear → Precision and responsiveness
* Spotify → Excellent content organization
* Duolingo → Encouraging progress
* Headspace → Peaceful visual language

The result should be uniquely **Lively Stones**, not a copy of any product.

---

# Core Design Principles

1. Mobile First
2. Accessibility by Default
3. Minimal Cognitive Load
4. Consistent Components
5. One Primary Action Per Screen
6. Fast Interactions
7. Calm Visual Hierarchy

Every screen should answer:

> **What should the user do next?**

---

# Layout System

Use a 12-column grid on desktop.

Use a single-column layout on mobile.

Spacing scale:

```text id="spacing"
4
8
12
16
24
32
48
64
96
```

Never use arbitrary spacing values.

---

# Responsive Breakpoints

* Mobile: 0–767px
* Tablet: 768–1023px
* Desktop: 1024–1439px
* Large Desktop: 1440px+

Design mobile first.

Desktop should enhance—not replace—the mobile experience.

---

# Color Philosophy

Colors should communicate warmth and trust.

Primary

Deep Forest Green

Represents:

* Growth
* Life
* Faith
* Hope

Secondary

Warm Gold

Represents:

* Light
* Joy
* God's Glory

Neutral Palette

Soft grays

Warm whites

Subtle borders

Avoid overly saturated colors.

---

# Semantic Colors

Success

Green

Warning

Amber

Error

Red

Information

Blue

Use semantic colors consistently across the platform.

---

# Typography

Primary Font

Geist

Fallback

Inter

Hierarchy

H1

Page titles

H2

Sections

H3

Cards

Body

Content

Caption

Metadata

Maximum reading width:

70 characters.

Optimize readability over density.

---

# Iconography

Use:

Lucide React

Rules:

* Consistent stroke width
* Rounded appearance
* Avoid filled icons
* Match icon size across components

Icons support content—they should not replace labels.

---

# Elevation

Minimal shadows.

Prefer:

* Borders
* Contrast
* Whitespace

Use shadows only for:

* Dialogs
* Dropdowns
* Floating menus

---

# Border Radius

Consistent radius scale:

```text id="radius"
Small

Medium

Large

Extra Large
```

Avoid mixing many radius values.

---

# Motion

Animations should feel:

* Natural
* Smooth
* Quick
* Purposeful

Recommended durations:

* 150ms
* 200ms
* 300ms

Avoid slow animations.

Respect reduced-motion preferences.

---

# Navigation

## Disciple Portal

Desktop

Top Navigation

* Home
* Materials
* Community
* Notifications
* Profile

Mobile

Bottom Navigation

* Home
* Materials
* Community
* Profile

Notifications remain in the app bar.

Keep navigation consistent across every page.

---

# Cards

Cards should present one concept.

Examples:

* Today's Verse
* Prayer Focus
* Continue Reading
* Upcoming Event

Avoid placing multiple unrelated actions inside a single card.

---

# Buttons

Primary

Filled

One per screen.

Secondary

Outlined

Tertiary

Text only.

Destructive

Red.

Loading states are mandatory.

---

# Forms

Every form should include:

* Labels
* Helper text
* Validation
* Error messages
* Success feedback

Never rely solely on placeholders.

---

# Empty States

Every empty page should educate and encourage.

Example:

No prayer requests yet.

Start by sharing something we can pray with you about.

Every empty state should include one clear action.

---

# Loading States

Always use skeleton loaders.

Avoid:

* Infinite spinners
* Layout shifts
* Blank screens

---

# Error States

Error messages should be:

* Human
* Helpful
* Actionable

Good:

"We couldn't load today's reading. Please try again."

Avoid technical jargon.

---

# Accessibility

Target WCAG AA compliance.

Support:

* Keyboard navigation
* Screen readers
* High contrast
* Large text
* Focus indicators
* Reduced motion

Accessibility is a requirement—not an enhancement.

---

# Dark Mode

Dark mode should feel calm.

Avoid pure black.

Prefer deep neutral backgrounds.

Ensure sufficient contrast for long reading sessions.

---

# Bible Reading Experience

This is the most important interface.

Requirements:

* Comfortable line height
* Adjustable font size
* Minimal distractions
* Persistent reading progress
* One-tap highlighting
* Beautiful typography

The Bible should feel like reading a premium digital book.

---

# Community Experience

Community should prioritize conversation over metrics.

Avoid:

* Like counters dominating the UI
* Trending badges
* Follower counts

Highlight:

* Prayer
* Encouragement
* Testimonies
* Scripture

---

# Admin Design

The Admin Portal should prioritize efficiency.

Characteristics:

* Dense information where appropriate
* Powerful filters
* Tables
* Bulk actions
* Keyboard shortcuts
* Quick search

Administrative interfaces should be optimized for productivity rather than immersion.

---

# Performance

Target:

* First Contentful Paint < 2s
* Lighthouse > 90
* Smooth 60 FPS interactions
* Optimized images
* Lazy-loaded routes
* Minimal bundle size

Performance is a design feature.

---

# Component Principles

Every component must be:

* Reusable
* Accessible
* Typed
* Documented
* Tested

Avoid duplicate components with slightly different behavior.

---

# Engineering Standards

Use:

* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React
* React Hook Form
* Zod
* Framer Motion (sparingly)

Avoid custom UI implementations when a well-tested component exists.

---

# Product Principle

> **The interface should quietly disappear, allowing Scripture, prayer, learning, and community to take center stage. Great design serves discipleship—it never competes with it.**
