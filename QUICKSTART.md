# Quick Start Guide - VEX Notebook

## ✅ Setup Complete!

Your VEX Engineering Notebook is now ready to use. The development server is running at:
**http://localhost:3000**

## 📝 How to Add New Entries

1. **Create a new Markdown file** in the `entries/` folder:
   - Name format: `entry-YYYY-MM-DD.md` (e.g., `entry-2025-10-15.md`)

2. **Add frontmatter** at the top:
   ```markdown
   ---
   title: Your Entry Title
   date: 2025-10-15
   author: Team 43280D
   ---
   ```

3. **Write your content** using Markdown:
   ```markdown
   # Main Heading
   
   Your content here...
   
   ## Section 1
   
   More content...
   
   ### Subsection
   
   - Bullet points
   - More bullets
   
   | Column 1 | Column 2 |
   |----------|----------|
   | Data 1   | Data 2   |
   ```

4. **Refresh your browser** - the new entry will appear automatically!

## 🖨️ Exporting to PDF

1. Open any entry page
2. Click the "🖨️ Print / Export to PDF" button
3. In the print dialog:
   - Select "Save as PDF" as destination
   - Use Portrait orientation
   - Default margins
   - Enable "Background graphics"
4. Save your PDF!

**New!** Each entry automatically starts on a new page with automatic page numbers.

## 🌙 Dark/Light Theme

Click the sun (☀️) or moon (🌙) icon in the header to toggle between themes. Your preference is automatically saved!

## 🎨 Customization Tips

### Change Team Name/Number
Edit the cover page: `entries/cover.md`

### Change Colors
Edit `styles/globals.css` - search for `#0066cc` and replace with your team colors

### Add Images
Store images in `/public/images/` folder and reference them:
```markdown
![Robot Design](/images/robot-v1.jpg)
```

### Embed Videos
Paste YouTube URLs directly in your Markdown:
```markdown
Watch our robot in action: https://www.youtube.com/watch?v=VIDEO_ID
```
Videos automatically embed and are hidden in PDF exports.

## 📁 Project Structure Quick Reference

```
/43280D
  /entries/           ← Your notebook content goes here
    cover.md         ← Team cover page
    entry-*.md       ← Individual entries
  
  /components/       ← React components (usually don't need to edit)
  /lib/              ← Utilities (usually don't need to edit)
  /pages/            ← Page templates (usually don't need to edit)
  /styles/           ← Edit these to change appearance
    globals.css      ← Screen styles
    print.css        ← Print/PDF styles
```

## 🚀 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## 🐛 Troubleshooting

### Port already in use?
If port 3000 is busy, Next.js will use 3001, 3002, etc. automatically.

### Entry not showing up?
- Check the frontmatter format (needs `---` before and after)
- Ensure the `date` field is present
- Refresh your browser

### Styling issues?
- Check both `globals.css` and `print.css`
- Use browser DevTools (F12) to inspect elements
- Remember: print styles only apply when printing

## 📚 Markdown Cheatsheet

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**Bold text**
*Italic text*

- Bullet list
- Another item

1. Numbered list
2. Another item

[Link text](https://example.com)

![Image](path/to/image.png)

`inline code`

```code block```

> Blockquote

| Table | Header |
|-------|--------|
| Cell  | Cell   |
```

## 🎯 Next Steps

1. ✅ Server is running
2. 📝 Edit `entries/cover.md` with your team info
3. 📝 Create your first real entry
4. 🖨️ Test the print/PDF export
5. 🎨 Customize colors to match your team
6. 🚀 Deploy to Vercel (see README.md)

## 💡 Pro Tips

- **Date format matters**: Use `YYYY-MM-DD` for consistent sorting
- **Commit often**: Use git to track changes
- **Test prints early**: Make sure formatting looks good
- **Use tables**: Great for data and specifications
- **Include code blocks**: For autonomous routines
- **Add images**: Visual documentation is powerful

---

**Need help?** Check the full README.md for detailed instructions!
