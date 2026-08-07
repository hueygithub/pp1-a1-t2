# Requirements: Team Page + Login Styling

**Card:** `[BOOTSTRAP RESTYLING] - Write requirements for team page + login styling : 60`  
**Sprint:** Task 2  
**Author:** Hieu Nguyen  
**Date:** 07-08-2026  
**Status:** Draft  
**Repo path:** `docs/requirements.md`

---

## 1. Overview

We are delivering a **restyled login page** that, on successful login, redirects the user to a **team page**. The team page introduces the team (team name + one card per member) to visitors.

This document intends to define what is being built, what is explicitly out of scope, the field-level rules for team page content, and the edge cases the devs should handle.

---

## 2. Scope

### In scope

- Visual restyling of the existing login page (CSS / component styling only).
- A new team page that displays the team name and one card for each member (photo, name, role, blurb).
- Post-login redirect from the login page to the team page.

### Out of scope

- **Any change to authentication logic, form validation, or session handling on the login page.** The login work is **styling-only**.
- User accounts, sign-up flows, or password reset flows beyond what the boilerplate already provides.
- Editing team member content from within the app — content is static / hardcoded for this task.
- Any page beyond the login page and team page.

---

## 3. Functional requirements

### Login page

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | The login page reflects the approved visual design ([link to Figma / design file — to be added by UX]). | Must |
| FR-02 | After a successful login, the user is redirected to `/team` | Must |
| FR-03 | No changes are made to the existing authentication logic, validation, or session handling behind the login form. | Must |

### Team page

| ID | Requirement | Priority |
|---|---|---|
| FR-04 | The team page displays the team name as the page header. | Must |
| FR-05 | The team page displays one card for each team member. | Must |
| FR-06 | Each member card displays: photo, name, role, blurb. | Must |
| FR-07 | The team page is only reachable by an authenticated user; unauthenticated visitors are redirected to the login page. | Must |

---

## 4. Team page fields — validation & display rules

Content for this task is static (stored in a config/JSON file or hardcoded in the component). These rules define how each field is authored and displayed.

| Field | Type | Required | Validation rule | Display rule |
|---|---|---|---|---|
| Team name | string | Yes | 1–`[40]` characters, plain text. | Rendered once at the top of the team page as the page heading. |
| Member photo | image (URL or local asset) | Yes | Must be a valid image path. Recommended: square, min `[400×400]`px, JPG or PNG. | Rendered inside the member card at a fixed aspect ratio. If missing, falls back to a default image (see EC-01). |
| Member name | string | Yes | 1–`[60]` characters, plain text. | Displayed under the photo. |
| Member role | string | Yes | One of: `PM`, `BA`, `UX Designer`, `Dev 1`, `Dev 2`. | Displayed as a badge or subheading under the name. |
| Member blurb | string | Yes | 1–`[240]` characters, plain text (no HTML). | Displayed under the role. Text longer than the display length is truncated with an ellipsis (...) (see EC-02). |

### Team members for Task 2

| Role | Name | Photo | Blurb |
|---|---|---|---|
| PM | [Name] | `[path/to/photo]` | [Short blurb, up to 240 chars] |
| BA | Hieu Nguyen | `[path/to/photo]` | Having worked with 3 growing businesses over the course of 5 years, Hieu has found a passion for becoming the bridge between what a business needs and what a team can build. Give him a vague idea and a whiteboard, and he'll hand you back a plan. |
| UX Designer | [Name] | `[path/to/photo]` | [Short blurb, up to 240 chars] |
| Dev 1 | [Name] | `[path/to/photo]` | [Short blurb, up to 240 chars] |
| Dev 2 | [Name] | `[path/to/photo]` | [Short blurb, up to 240 chars] |

---

## 5. Edge cases

| ID | Case | Expected behaviour |
|---|---|---|
| EC-01 | A member's photo is missing or fails to load. | Fall back to a default placeholder image; the card still renders with name, role, and blurb. |
| EC-02 | A member's blurb exceeds the display length. | Truncate with an ellipsis on the card; storing the full text is not required in Sprint 1. |
| EC-03 | A member's blurb is empty. | Card still renders; the blurb area shows a placeholder (`—`). |
| EC-04 | Team name is empty or missing. | Fall back to `[Default team name]`; raise with PM if this occurs in production content. |
| EC-05 | An unauthenticated user visits `/team` directly. | Redirect to the login page (handled by the existing auth guard — no changes to auth logic). |
| EC-06 | Login is submitted with invalid credentials. | Existing boilerplate behaviour is preserved; no changes required. |

---

## 6. Acceptance criteria (summary for Dev 2 / QA)

- [ ] Login page matches the approved design.
- [ ] Login form still authenticates using the existing boilerplate logic (no regression).
- [ ] Successful login redirects to `/team`.
- [ ] Team page displays the team name and one card per member.
- [ ] Each card shows photo, name, role, and blurb.
- [ ] Missing photo falls back to a default placeholder.
- [ ] Unauthenticated access to `/team` redirects to the login page.

---

## 7. Assumptions & dependencies

- The boilerplate's authentication works out of the box and does not need to be modified.
- Team member content (photos, names, roles, blurbs) is provided by the team and delivered via a config/JSON file or component data for Sprint 1.
- Visual design (colours, typography, layout) will be produced by the UX designer as a Figma file (or equivalent) and linked back into this document once available.

---

## 8. References

- Design file (Figma / equivalent): `[link — to be added by UX]`

---

## Change log

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | [07-08-2026] | [Hieu Nguyen] | Initial draft |