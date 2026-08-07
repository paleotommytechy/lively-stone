# CODEOWNERS

# Code Owners

## Purpose

Automatically request reviews from responsible maintainers.

---

## Ownership

```text
*                             @maintainers

/src/components/              @frontend

/src/features/                @frontend

/src/services/                @backend

/src/lib/                     @backend

/supabase/                    @backend

/docs/                        @documentation

/.github/                     @devops

/public/                      @frontend
```

---

## Rules

* Every PR requires at least one approval.
* Security changes require backend review.
* Database changes require backend review.
* Documentation changes require documentation review.
* CI changes require DevOps review.

---

## Principle

> Every change should be reviewed by someone responsible for that part of the system.
