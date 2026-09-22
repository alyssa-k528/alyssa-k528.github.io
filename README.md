# Alyssa's website

A small static website made with HTML, CSS, and JavaScript. 

## Edit your bio

Open **content/about.md** and change the paragraphs. Leave a blank line between paragraphs.

## Edit a job or project

Each entry has its own file in **content/experience/** or **content/projects/**.

The top of a file looks like this:

```text
---
title: My project
date: September 2026
link: https://example.com
linkLabel: View project
---
Write your description here.

- First achievement
- Second achievement
```

Only the title is required. Remove the date, link, or linkLabel line if you do not need it. Values are plain text on one line, without quotes. Keep both --- lines.

Supported formatting: paragraphs separated by blank lines, bullets starting with "- ", **bold text**, [link text](https://example.com), and headings starting with "## ". This is a small Markdown subset; HTML, tables, nested lists, and code blocks are not supported.

## Add, remove, or reorder an entry

1. Copy an existing Markdown file and give it a new filename.
2. Edit its title and description.
3. Add its path to **content/work.json**, under experience or projects.

The order in work.json is the display order. Remove a path to hide an entry. Keep filenames and capitalization exact.

## Add Laila photos

1. Put the new photo in **pics/laila/**.
2. Add an entry in **content/laila.json**:

```json
{
  "src": "pics/laila/new-photo.jpg",
  "alt": "Laila sleeping on the sofa",
  "caption": "An optional caption"
}
```

Use a useful image description in alt. Caption is optional. Width and height, if included, must be the original image's pixel dimensions; they reserve space while loading. No need to resize every photo to the same shape.

Reorder or remove entries to change the gallery. Photos read down a column, then across. There are three columns on desktop and two at phone widths (600px and below). Each photo keeps its original proportions.

## Where the code lives

- **index.html**: page structure, three sections, footer, and photo viewer.
- **styles.css**: colors and layouts; tablet and phone adjustments are at the bottom.
- **script.js**: typewriter, tab navigation, Markdown loading, and enlarged photos.
- **.nojekyll**: keep this empty file. It tells GitHub Pages to serve files unchanged so our JavaScript can read the original Markdown.
