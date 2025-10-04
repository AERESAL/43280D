# Adding Your Background Image

## Instructions

To use your custom background image:

1. **Save your image** as `background.jpg` in the `/public/` folder
   - The image should be high quality (1920x1080 or larger recommended)
   - JPG or PNG format works

2. **Replace the placeholder:**
   ```
   /public/background.jpg  ← Place your image here
   ```

3. **Image will automatically:**
   - Cover the entire background
   - Stay fixed when scrolling
   - Work on all screen sizes
   - Be hidden when printing

## Using Your Dropbox Image

Since the Dropbox preview URL doesn't allow direct downloads, you need to:

1. Go to your Dropbox and download the image
2. Save it as `background.jpg`
3. Place it in the `/public/` folder of this project

## Alternative: Use a Direct URL

If you have a direct image URL (not a preview), you can update the CSS:

Edit `styles/globals.css` and change line with `background-image`:

```css
background-image: url('YOUR_DIRECT_IMAGE_URL');
```

## Current Setup

The site is configured to use `/background.jpg` with:
- Full screen coverage
- Fixed position (doesn't scroll)
- Dark overlay for text readability
- Automatic hiding in print mode

Just add your image and it will work! 🎨
