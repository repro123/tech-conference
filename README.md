# Frontend Mentor - Tech Conference Site

A responsive, multi-page conference website for **DevHorizon 2026**. Visitors can explore the event, browse its speakers and talk programme, save sessions to a personal schedule, and export sessions as calendar files. The app is built with Astro, TypeScript, React islands, and Tailwind CSS, and includes Progressive Web App support.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Application features](#application-features)
  - [Schedule and saved sessions](#schedule-and-saved-sessions)
  - [Sanity content management](#sanity-content-management)
  - [Data model](#data-model)
  - [Accessibility](#accessibility)
  - [Progressive Web App](#progressive-web-app)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [My process](#my-process)
  - [Built with](#built-with)
  - [How the application works](#how-the-application-works)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

This project is a complete conference information and planning site based on the [Frontend Mentor Tech Conference Site challenge](https://www.frontendmentor.io/challenges/tech-conference-site). It brings together the main information attendees need: what the event is about, who is speaking, what sessions are happening, and how to keep track of sessions they want to attend.

The interface is designed to adapt from small mobile screens to larger desktop screens. Conference, speaker, talk, and track records are fetched from Sanity and used across the home, schedule, and speakers pages. The attendee's personal saved-talk list remains in browser storage.

### Screenshot

![Screenshot of the DevHorizon 2026 conference website](./public/screenshot.jpg)

### Links

- Frontend Mentor solution: [Tech Conference Site solution](https://www.frontendmentor.io/solutions/tech-conference-app-with-pwa-support-astro-typescript-react-dEomX2O7oz)
- Live site: [tech-conference-ashen.vercel.app](https://tech-conference-ashen.vercel.app/)

### Application features

#### Home page

The home page introduces the event and directs visitors to the detailed programme:

- A hero panel presents the conference tagline, date range, and venue.
- A featured keynote panel uses the first talk returned from Sanity and its referenced speaker, and shows the session time and room. Its **View talk** link opens the schedule with that talk expanded.
- A tracks section introduces Frontend, Performance, Accessibility, and Tooling. The displayed track labels, descriptions, and schedule links are currently defined in src/lib/data/tracks.ts; schedule track records and filters are fetched from Sanity.
- A featured-speakers section shows Sanity speaker records flagged as featured and links to the full speaker directory.
- Schedule highlights show Sanity talk records flagged as highlighted. The talk cards can be expanded to reveal descriptions and room locations.
- A **View full schedule** call to action opens the complete programme.

#### Schedule page

The schedule page fetches talks, speakers, and tracks from Sanity and displays the talks as a list of cards. Each card includes its track, talk title, speaker and company, start and end time, day, and an add-to-schedule control.

- **Day filters:** Choose one conference day at a time. The default is Day 1 when no day is specified in the URL.
- **Track filter:** Choose one track at a time. Track names are Frontend, Performance, Accessibility (labelled **a11y** in the filter), and Tooling. The Keynote track is not offered as a filter.
- **My Schedule filter:** Show only the sessions saved in this browser. It can be used together with the selected day and track.
- **Reset filters:** Clear the query parameters and return to the default Day 1 view.
- **Clear my schedule:** Remove all saved session IDs from the local saved schedule.
- **Talk details:** Expand a card to read the full description and room. Only the talk selected through the `talk` URL parameter opens automatically; the control updates the URL when toggled.
- **Empty state:** If the selected day, track, and saved-only combination has no matching talks, a status message suggests changing or resetting filters.
- **Calendar exports:** Download every conference talk or only saved talks as an `.ics` calendar file. If there are no saved talks, the saved-schedule action displays a short message instead of downloading an empty file.

Day, track, saved-only, and expanded-talk state are represented in the URL query string. This makes a filtered or expanded schedule view linkable and allows browser Back and Forward navigation to restore previous views.

#### Speakers page

The speakers page fetches speakers, talks, and tracks from Sanity and presents them in a responsive card grid. Cards show the speaker's portrait, name, role, company, and talk title. Portraits use optimized URLs from Sanity's image service. Activating a speaker name opens a dialog with:

- A larger speaker portrait, role, and company.
- The speaker's full biography.
- Their associated talk, including its track, time, and a control to save or remove it from **My Schedule**.
- Dialog close controls, including the close button, backdrop interaction, and Escape-key support provided by the dialog component.

The home page reuses the same speaker cards for the featured subset.

#### Shared site interface

- A shared header links to Home, Schedule, and Speakers. The active desktop page is indicated in the navigation.
- On narrow screens, navigation is provided by a slide-in menu drawer with open and close controls.
- A shared footer provides navigation links, track links, venue details, the event dates, copyright, and a smooth **Back to top** control.
- Page titles and descriptions are set per route for document metadata.

### Schedule and saved sessions

Saved sessions are identified by talk IDs and managed through a Nanostores persistent store. The store serializes the list to browser storage, so a visitor's selections remain available after reloading or reopening the site in the same browser. No account or server-side profile is required.

The star control is available on schedule cards and inside a speaker's talk dialog. It exposes its action and pressed state through accessible button attributes. The **My Schedule** filter reads the same saved IDs, and the saved-calendar export uses those IDs to select which events to include.

Calendar exports use the conference start date plus each talk's day number to determine its date. Talk title, description, room, start time, and end time are included in the generated calendar events. Talks outside the configured conference date range are skipped.

### Sanity content management

Sanity is the active source for event information rendered across the site. The Astro integration is configured in [astro.config.mjs](./astro.config.mjs), and focused query helpers live in [src/lib/sanity](./src/lib/sanity):

| Helper | Sanity content fetched |
| --- | --- |
| getConference() | The first conference document, including event name, tagline, dates, and venue. |
| getTracks() | Track documents, ordered by name. |
| getSpeakers() | Speaker documents, ordered by name, including biographies, featured flags, and avatar image references. |
| getTalks() | Talk documents, ordered by day and start time, including schedule details and speaker/track references. |

Astro components call these helpers in their frontmatter and pass the fetched records into page components. The Sanity integration uses the configured project ID, the production dataset, API version 2026-10-20, and useCdn: false. No API token is configured in this frontend, so the dataset must allow the read access required by the build. This is a static Astro site: Sanity content is fetched during the build, and published edits appear on the deployed site after a new build and deployment.

The application types are in [src/lib/sanity/types.ts](./src/lib/sanity/types.ts), with GROQ queries in the corresponding helper files. A Sanity Studio or schema definition is not included in this repository; content is edited in the connected Sanity project.

Some track presentation is still local. [src/lib/data/tracks.ts](./src/lib/data/tracks.ts) supplies the home-page and footer track labels, descriptions, and URL slugs. Track records used to color talk cards and generate schedule filters are fetched from Sanity. Keep those local links aligned with the Sanity track records until the presentation links are moved into CMS data. The old [src/lib/data/data.json](./src/lib/data/data.json) remains in the repository but is no longer the active source for conference, speaker, talk, or schedule content.

### Data model

The Sanity records used by the application have these fields:

| Content type | Fields used by the app |
| --- | --- |
| Conference | name, brandCode, tagline, startDate, endDate, and location (venue, city, cityAbbreviation, state). |
| Track | id, name, description, and color. Track color is applied to talk cards and speaker card accents. |
| Speaker | id, name, role, company, bio, featured, and avatar image reference. |
| Talk | id, title, day, description, startTime, endTime, location, highlighted, plus speaker and track references. |

Talks point to speakers and tracks using Sanity references. The GROQ query returns those references, and the UI matches their _ref values with fetched speaker and track IDs. The first talk in the ordered talk query currently supplies the home-page keynote. The featured flag selects home-page speaker cards, and highlighted selects schedule highlights. Keep references connected to valid documents, use day values within the conference date range, and use H:MM 24-hour times.

### Accessibility

Accessibility considerations implemented in the interface include:

- Semantic page landmarks, headings, navigation, lists, and buttons.
- Keyboard-operable links and controls, with visible focus treatments on interactive elements.
- `aria-pressed` state on schedule filter buttons and saved-talk buttons.
- `aria-expanded` and `aria-controls` relationships for talk detail disclosures.
- `aria-hidden` state on collapsed talk-detail panels, updated with the expanded state.
- A polite live status for the schedule's no-results message.
- Accessible names for icon-only controls, including mobile menu actions and saved-talk buttons.
- A dialog primitive for speaker details, providing standard dialog interaction and dismissal behavior.
- Decorative images and icons use empty alternative text where appropriate.

### Progressive Web App

The app registers a service worker through `@vite-pwa/astro` and requests immediate registration with automatic updates. A web app manifest configures the app name, theme and background colors, standalone display mode, start URL, and install icons. Workbox is configured with a navigation fallback and precaches matching JavaScript, CSS, HTML, SVG, PNG, WebP, and font files generated for the build.

The PWA setup allows supported browsers to offer an installable app experience and serves cached application assets when available. Actual offline behavior depends on the browser's service-worker support and which assets have already been cached.

## Getting started

### Requirements

- Node.js **22.12.0 or newer** (as specified by the project).
- pnpm, used to install dependencies from the included lockfile.
- Read access to the Sanity project and dataset configured in astro.config.mjs.

### Install dependencies

```sh
pnpm install
```

### Run the development server

```sh
pnpm dev
```

Astro starts the local development server and prints its URL in the terminal.

The current Sanity setup uses the project ID and dataset configured in astro.config.mjs and does not require Sanity environment variables. To connect a different Sanity project, update those integration settings and ensure its records match the types and GROQ queries in src/lib/sanity/.

### Build and preview

```sh
pnpm build
pnpm preview
```

The production build is written to `dist/`. The preview command serves that build locally.

## Project structure

```text
public/                       Static images, icons, and web manifest
  images/                     Speaker portraits
  screenshot.jpg              README project screenshot
src/
  assets/                     Bundled SVG patterns and local font files
  components/
    client/                   Interactive React islands
    footer/                   Shared footer sections
    header/                   Shared desktop/mobile navigation
    home/                     Home page sections
    schedule/                 Talk cards, filters, and calendar actions
    speakers-page/            Speaker directory and cards
    svgs/                     Reusable SVG components
    ui/                       Shared UI components
  layouts/                    Shared page layout, metadata, and containers
  lib/
    data/                     Legacy conference JSON and local navigation/track links
    sanity/                   Sanity types, image URLs, and GROQ fetch helpers
    types/                    Shared TypeScript types
  pages/                      Astro route entry points
  stores/                     Persistent My Schedule state
  styles/                     Global Tailwind theme and styles
  utils/                      Date formatting and calendar generation
astro.config.mjs              Astro, React, Tailwind, fonts, and PWA setup
package.json                  Scripts and dependencies
pnpm-lock.yaml                Locked dependency versions
```

## My process

### Built with

- [Astro](https://astro.build/) for page routing, layouts, and server-rendered components.
- [Sanity](https://www.sanity.io/) with [@sanity/astro](https://www.sanity.io/docs/astro) for structured conference content, GROQ queries, and image delivery.
- [TypeScript](https://www.typescriptlang.org/) for typed application code and content interfaces.
- [React](https://react.dev/) for interactive client-side components.
- [Tailwind CSS](https://tailwindcss.com/) for responsive utility styling and the project design tokens.
- [Nanostores](https://nanostores.github.io/nanostores/) and its persistent adapter for the saved-talk state.
- [Base UI](https://base-ui.com/) for accessible dialog and drawer primitives.
- [Lucide](https://lucide.dev/) icons for interface controls.
- [ics](https://github.com/adamgibbons/ics) for generating downloadable calendar files.
- [Vite PWA](https://vite-pwa-org.netlify.app/) for service-worker registration, manifest support, and Workbox configuration.
- Local Chakra Petch and JetBrains Mono fonts.
- Responsive layouts using CSS Grid, Flexbox, and mobile-first breakpoints.

### How the application works

Astro fetches conference content from Sanity in page/component frontmatter and renders the page structure at build time. Query helpers in src/lib/sanity/ keep the GROQ requests and application types together. React is used where the interface needs client-side state or accessible overlay behavior: mobile navigation, saved-talk controls, and speaker dialogs. The schedule filter and talk disclosure behavior use small browser-side scripts.

Schedule filters and the selected talk are encoded in query parameters. The schedule page reads those parameters, compares them with data attributes on each rendered talk card, and hides cards that do not match. Filter actions update browser history and dispatch an event so the list can be refreshed without a full page reload.

### What I learned

This project brought together several patterns that work well for a content-heavy event site:

- Keep structured content separate from presentation. Stable speaker, talk, and track IDs make it straightforward to connect related records.
- Use a headless CMS for content that needs editorial updates, and keep fetch queries and TypeScript response types close together.
- Model CMS relationships as references and resolve them against fetched records in the UI.
- Use Astro for pages that are mostly content, then hydrate React components only where browser interaction is needed.
- Treat the URL as shareable interface state for filters and open talk details. This also makes browser history useful instead of leaving filter changes invisible to navigation.
- Keep shared saved-session state in one persistent store so cards, filters, and exports all use the same source of truth.
- Generate calendar events from conference dates and talk times rather than maintaining separate downloadable files.
- Establish a small theme with named colors, type presets, and button variants so the same design language can be applied throughout the site.

### Continued development

Possible next improvements include:

- Allow selecting multiple tracks at once, if the schedule experience should support combined track selection.
- Add dedicated automated checks for filter combinations, persistence, calendar export dates, and dialog keyboard interactions.
- Improve PWA feedback by surfacing service-worker registration and offline-ready state to visitors.
- Review screen-reader announcements for saved-session changes and filter result counts, in addition to the existing no-results status.
- Move the remaining home-page and footer track labels/descriptions from the local track list into Sanity so track presentation has one source of truth.
- Select the featured keynote by an explicit Sanity field or query rather than relying on the first item in the ordered talks result.
- Add an event timezone field so calendar exports can represent the venue's local time explicitly.

### Useful resources

- [Astro documentation](https://docs.astro.build/) - Guides for Astro pages, components, layouts, and integrations.
- [Astro routing](https://docs.astro.build/en/guides/routing/) - Reference for the file-based routes used by the app.
- [Astro framework components](https://docs.astro.build/en/guides/framework-components/) - Explains how React components can be included in Astro pages.
- [Sanity documentation](https://www.sanity.io/docs) - Reference for Sanity datasets, documents, GROQ, and image assets.
- [Tailwind CSS documentation](https://tailwindcss.com/docs) - Utilities and configuration reference for responsive styling.
- [Nanostores documentation](https://nanostores.github.io/nanostores/) - Small reactive stores used for saved sessions.
- [Vite PWA documentation](https://vite-pwa-org.netlify.app/) - Service-worker and web app manifest configuration.
- [MDN: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) - Reference for the accessibility attributes used by interactive controls.

### AI collaboration

AI assistance was used to prepare this README from the project source. The implementation details were checked against the pages, components, data, and configuration in the repository. This note describes the documentation work and does not claim that AI was used for the original application implementation.

## Author

- Frontend Mentor solution: [Tech Conference Site](https://www.frontendmentor.io/solutions/tech-conference-app-with-pwa-support-astro-typescript-react-dEomX2O7oz)

Personal profile links are omitted because no author profile details were provided.

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io/) for the Tech Conference Site challenge and project brief.
- The maintainers of Astro, React, Tailwind CSS, Nanostores, Base UI, Lucide, ics, and Vite PWA for the tools and documentation used by the project.
