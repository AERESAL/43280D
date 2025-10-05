const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const entriesDirectory = path.join(process.cwd(), 'entries');

function getAllEntries() {
  // Get file names under /entries
  const fileNames = fs.readdirSync(entriesDirectory);
  const allEntriesData = fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName !== 'cover.md' && fileName !== 'prenibs.md')
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(entriesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...matterResult.data,
        date: matterResult.data.date ? String(matterResult.data.date) : '',
        content: matterResult.content,
      };
    });

  // Sort entries by date (newest first)
  return allEntriesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function getEntryBySlug(slug) {
  const fullPath = path.join(entriesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  return {
    slug,
    ...matterResult.data,
    date: matterResult.data.date ? String(matterResult.data.date) : '',
    content: matterResult.content,
  };
}

function getCoverPage() {
  const fullPath = path.join(entriesDirectory, 'cover.md');
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    ...matterResult.data,
    content: matterResult.content,
  };
}

function getPrenibsPage() {
  const fullPath = path.join(entriesDirectory, 'prenibs.md');
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    ...matterResult.data,
    content: matterResult.content,
  };
}

function getAllSlugs() {
  const fileNames = fs.readdirSync(entriesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName !== 'cover.md' && fileName !== 'prenibs.md')
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

module.exports = {
  getAllEntries,
  getEntryBySlug,
  getCoverPage,
  getPrenibsPage,
  getAllSlugs,
};
