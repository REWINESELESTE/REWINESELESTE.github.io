# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BUSF** - A minimal static portfolio website for an experimental/electronic musician hosted on GitHub Pages. The site showcases sound installations, field recordings, and experimental music projects.

## Site Architecture

### Navigation Structure
The site uses a consistent fixed sidebar navigation across all pages:
- **BUSF** (homepage) - features text scrambling effect on click
- **works** - project listing page
- Individual project pages organized by work title
- **info** - contact/bio page

### Page Layout Types

**Vertical Layout** (`project-vertical` class):
- Sequential text and images with 60px margins
- Embedded Bandcamp/YouTube players via iframe wrappers
- Used for: `/works/rains/`, `/works/railway/`

**Horizontal Slider** (`project-horizontal` class):
- Side-scrolling image gallery with 5000px container width
- Auto-resizing based on image dimensions

**Image Slider** (`project-slider` class):
- Click-through gallery with arrow navigation
- Active state management via JavaScript

### File Structure Conventions

- All pages share the same navigation structure
- Global styles in `/index.css` (responsive, mobile-first)
- Interactive features in `/js/index.js`
- Project pages located in `/works/[project-name]/index.html`
- All paths are absolute (start with `/`)

### Content Patterns

- Each project page has consistent navigation with active state on current page
- Image assets stored in project directories
- Embedded media uses responsive iframe wrappers
- Typography: 13px Helvetica with 1.5px letter-spacing
- Color scheme: black text (#111) on white, blue accent (#0019ff)

### Responsive Design

- Fixed sidebar navigation converts to overlay on mobile (<600px)
- Horizontal layouts stack vertically on small screens
- Mobile-first CSS approach with breakpoints

## Development Notes

- No build process required - pure HTML/CSS/JS
- No external dependencies or frameworks
- Deployment via GitHub Pages (static hosting)
- All navigation menus must be updated manually across pages when adding/removing projects