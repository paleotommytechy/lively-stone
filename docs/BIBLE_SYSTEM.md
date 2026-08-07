# BIBLE_SYSTEM.md

# Bible System

## Purpose

The Bible System is the heart of the Lively Stones Platform.

Its purpose is not merely to display Scripture but to cultivate a lifelong love for God's Word through consistent reading, study, meditation, reflection, and application.

The platform should encourage disciples to **know Scripture, obey Scripture, and delight in Scripture**.

---

# Design Philosophy

Reading the Bible should feel:

* Peaceful
* Focused
* Encouraging
* Beautiful
* Distraction-free

The Bible should never compete with the rest of the application.

Instead, the entire application should revolve around Scripture.

---

# Core Principle

> **Every login should naturally lead the disciple back to God's Word.**

---

# Home Integration

The first meaningful action after login should be:

```text
Today's Verse

↓

Continue Reading

↓

Reflect

↓

Pray

↓

Apply

↓

Share (Optional)
```

Scripture should never be buried behind menus.

---

# Bible Navigation

```text
Bible

├── Continue Reading
├── Reading Plans
├── Books
├── Search
├── Highlights
├── Notes
├── Bookmarks
├── Memory Verses
└── Reading History
```

---

# Continue Reading

The application should always remember:

* Last Book
* Last Chapter
* Last Verse

One click should continue exactly where the disciple stopped reading.

---

# Reading Plans

Support multiple plans.

Examples:

* One Year Bible
* New Testament
* Proverbs
* Psalms
* Gospels
* Chronological Bible
* Foundations of Faith
* School of Tyrannus Reading Plan

Each plan includes:

* Progress
* Estimated completion
* Daily schedule
* Missed days
* Catch-up recommendations

---

# Daily Reading

Each day includes:

* Assigned passage
* Estimated reading time
* Reflection question
* Prayer prompt
* Key takeaway

Reading should feel like a guided devotion rather than a checklist.

---

# Bible Reader

Features:

* Multiple translations
* Adjustable font size
* Dark mode
* Reading progress
* Chapter navigation
* Verse selection
* Offline caching (Future)

The reading interface should remain uncluttered.

---

# Highlights

Users may highlight verses.

Categories:

* Promise
* Command
* Prayer
* Wisdom
* Faith
* Love
* Hope
* Personal

Highlights remain searchable.

---

# Notes

Every verse supports personal notes.

Notes include:

* Rich text
* Timestamps
* Linked verses
* Tags

Notes are private by default.

---

# Bookmarks

Bookmarks allow quick access to meaningful passages.

Users may organize bookmarks into collections.

Examples:

* Prayer
* Evangelism
* Leadership
* Comfort
* Worship

---

# Memory Verses

Support Scripture memorization.

Features:

* Daily reminder
* Progress tracking
* Weekly review
* Revision schedule

Future:

Interactive memorization exercises.

---

# Bible Search

Search by:

* Reference
* Keyword
* Phrase
* Topic
* Book

Search results should be fast and intuitive.

---

# Reading History

Track:

* Days read
* Chapters completed
* Reading plans
* Time spent
* Last reading

History exists to encourage consistency, not comparison.

---

# Reflection

After reading, encourage reflection.

Prompts:

* What did you learn?
* What challenged you?
* What will you obey today?
* Who can you encourage with this passage?

Reflection is more important than speed.

---

# Sharing

Users may share:

* Verse
* Highlight
* Reflection
* Beautiful verse graphics

Sharing should always preserve proper Scripture attribution.

---

# Bible API (YouVersion Platform Integration)

The platform is integrated with the official **YouVersion Platform Bible API** (`v1`).

### Base URL & Authentication

* **Base URL**: `https://api.youversion.com/v1`
* **Authentication Header**: `X-YVP-App-Key: <APP_KEY>`
* **Configuration**: Injected securely via `VITE_YVP_APP_KEY` / `YVP_APP_KEY` environment variables.

### Endpoints Used

* `GET /v1/verse_of_the_days/{day}`: Fetches the passage identifier (e.g., `JHN.3.16`, `JOS.1.9`) for the day of the year (1–366).
* `GET /v1/bibles`: Retrieves authorized, licensed Bible versions (BSB, NIV, KJV, ESV, WEB, NLT).
* `GET /v1/bibles/{bibleId}/books`: Retrieves canonical books with USFM codes.
* `GET /v1/bibles/{bibleId}/passages/{passageId}?format=text`: Retrieves passage text and attribution.
* `GET /v1/bibles/{bibleId}/books/{usfm}/chapters/{chapter}`: Fetches full chapter text.

### Day of Year Calculation

The application computes today's day-of-year ($1 \dots 366$) with exact leap year logic:
* Non-leap years: 1 (Jan 1) to 365 (Dec 31)
* Leap years: 1 (Jan 1), 60 (Feb 29), to 366 (Dec 31)

### Caching Strategy

* **React Query**: Verse of the Day is cached for 12 hours (`staleTime: 12h`, `gcTime: 24h`).
* **Bible Versions & Books**: Cached for 24 hours.
* **Passages & Chapters**: Cached for 24 hours.
* **Resilience**: Automatic fallback to curated Scripture anchors if rate-limited or offline.

### Licensing & Copyright Compliance

* Bible translations are accessed dynamically via YouVersion Platform API.
* No unauthorized copies of full Bible texts are stored in the database.
* Attribution notices and copyright statements from YouVersion are preserved and displayed in the reader and daily scripture surfaces.

---

# Accessibility

Support:

* Large fonts
* High contrast
* Screen readers
* Keyboard navigation
* Reading mode

The Bible should be accessible to every believer.

---

# Future Features

Potential additions:

* Audio Bible
* Reading with friends
* Mentor reading plans
* AI study assistant
* Original language insights
* Cross references
* Maps
* Timelines

Future features must enhance understanding—not distract from Scripture.

---

# Success Metrics

Measure:

* Reading consistency
* Reading plan completion
* Notes created
* Memory verses completed
* Reflection submissions
* Return to reading

Do not measure:

* Total reading time
* Fastest completion
* Competitive rankings

---

# Engineering Principles

Always:

* Cache chapters efficiently.
* Save reading progress automatically.
* Support offline reading where possible.
* Separate Bible content from user-generated data.
* Respect Bible API licensing.

Never:

* Interrupt reading with unnecessary UI.
* Display advertisements.
* Require unnecessary clicks to continue reading.
* Treat Bible reading like a game.

---

# Product Principle

> **The Bible is not another feature of the platform. It is the foundation upon which the entire platform is built.**
