# VEX Notebook - Engineering Documentation Site

A static site for documenting VEX Robotics engineering processes, built with Next.js and optimized for print/PDF export.

## Features

✅ **Markdown-based entries** - Write entries in simple Markdown with frontmatter  
✅ **Auto-generated pages** - Each entry gets its own page automatically  
✅ **Table of Contents** - Auto-generated from headings in each entry  
✅ **Print-ready formatting** - Professional PDF export with proper page breaks and page numbers  
✅ **Cover page support** - Dedicated cover page with special print styling  
✅ **Dark/Light theme** - Toggle between themes with preference saved  
✅ **Rich media support** - Images, videos, and YouTube embeds  
✅ **Modern card-based UI** - Beautiful, responsive design with hover effects  
✅ **Static site export** - Fast, deployable to Vercel, GitHub Pages, or any host  

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

### Notebook Format

The notebook displays as a **single continuous page**:
- Cover page at the top
- All entries displayed in chronological order
- Scroll down to read through your entire notebook
- Each entry automatically starts on a new page when printing

## Project Structure

```
/vex-notebook
  /entries/                 # Your notebook content (Markdown files)
    cover.md               # Cover page
    entry-2025-09-01.md    # Example entry
    entry-2025-09-10.md    # Example entry
    ...

  /lib/
    posts.js               # Markdown loading and parsing utilities

  /components/
    PrintButton.jsx        # Print/PDF export button
    TOC.jsx               # Table of contents generator

  /pages/
    index.js              # Home page (lists all entries)
    /entries/
      [slug].js           # Dynamic entry page renderer

  /styles/
    globals.css           # Base styling
    print.css            # Print-specific styles
```

## Creating Entries

### Entry Format

Create new entries in `/entries/` folder with frontmatter:

```markdown
---
title: Your Entry Title
date: 2025-09-01
author: Team 43280D
---

# Your Entry Title

Your content here...

## Section 1

Content...

## Section 2

Content...
```

### Cover Page

Edit `entries/cover.md` to customize your cover page:

```markdown
---
title: VEX Robotics Engineering Notebook
team: 43280D
season: 2025-2026
---

# VEX Robotics Engineering Notebook

## Team 43280D

Your cover page content...
```

## Building for Production

### Static Export

Generate static HTML files:

```bash
npm run build
```

Output will be in `/out` directory.

### Local Preview

Preview the production build:

```bash
npm run start
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy

3. **Auto-deploy:**
   - Every push to `main` automatically deploys

### Alternative Deployment Options

**GitHub Pages:**
```bash
npm run build
# Deploy /out folder to gh-pages branch
```

**Netlify:**
- Connect repository
- Build command: `npm run build`
- Publish directory: `out`

**Custom Server:**
```bash
npm run build
# Copy /out folder to your web server
```

## Printing & PDF Export

### Print from Browser

1. Click the "🖨️ Print / Export to PDF" button
2. In the print dialog:
   - **Destination:** Save as PDF
   - **Layout:** Portrait
   - **Margins:** Default
   - **Options:** Enable "Background graphics"

### Print Settings

The print styles automatically:
- Hide navigation and buttons
- Use serif fonts for readability
- Apply proper page breaks
- Format for Letter (8.5" x 11") paper
- Include 0.75" margins

## Adding Media

### Images

1. Place images in `/public/images/` folder
2. Reference in Markdown:
   ```markdown
   ![Robot Design](/images/robot-design.jpg)
   ```

### Videos

Embed YouTube videos by including the URL:
```markdown
Check out our robot: https://www.youtube.com/watch?v=VIDEO_ID
```

Videos are automatically hidden in print/PDF exports.

## Customization

### Theme Colors

Edit color variables in `styles/globals.css`:

```css
:root[data-theme='light'] {
  --accent-primary: #2563eb;  /* Change primary color */
  --accent-secondary: #f97316; /* Change secondary color */
}

:root[data-theme='dark'] {
  --accent-primary: #3b82f6;
  --accent-secondary: #fb923c;
}
```

### Styling

Edit styles in:
- `styles/globals.css` - Screen display and theme variables
- `styles/print.css` - Print/PDF output

### Layout

Modify page layouts in:
- `pages/index.js` - Home page
- `pages/entries/[slug].js` - Entry pages

## Tech Stack

- **Framework:** Next.js 14 (Pages Router)
- **Markdown Parsing:** gray-matter, react-markdown
- **GitHub Flavored Markdown:** remark-gfm
- **Styling:** CSS (no framework dependencies)
- **Deployment:** Vercel-optimized

## License

MIT License - feel free to use for your VEX team!

## Support

For issues or questions:
- Create an issue on GitHub
- Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)

---

**Built for VEX Robotics Teams** 🤖  
*Good luck in your competitions!*