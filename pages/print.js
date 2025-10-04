import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PrintPage({ coverContent, coverData, prenibsContent, prenibsData, entries }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-document">
      {/* Print Button - Hidden when printing */}
      <div className="print-button-container no-print">
        <button onClick={handlePrint} className="print-page-button">
          🖨️ Print to PDF
        </button>
      </div>

      {/* Cover Page */}
      <div className="print-page cover-page-print">
        <div className="cover-content-print">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Auto-embed YouTube videos
              a: ({ node, href, children, ...props }) => {
                const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
                const match = href?.match(youtubeRegex);
                
                if (match) {
                  const videoId = match[1];
                  return (
                    <div className="video-wrapper" style={{ display: 'none' }}>
                      <iframe
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
                }
                
                return <a href={href} {...props}>{children}</a>;
              }
            }}
          >
            {coverContent}
          </ReactMarkdown>
        </div>
      </div>

      {/* Prenibs Page - Right after cover */}
      {prenibsContent && (
        <div className="print-page entry-page-print">
          <div className="entry-content-print markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Hide videos in print
                a: ({ node, href, children, ...props }) => {
                  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
                  const match = href?.match(youtubeRegex);
                  
                  if (match) {
                    return (
                      <div className="video-wrapper" style={{ display: 'none' }}>
                        <p>[Video: {children}]</p>
                      </div>
                    );
                  }
                  
                  return <a href={href} {...props}>{children}</a>;
                }
              }}
            >
              {prenibsContent}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Table of Contents */}
      <div className="print-page toc-page-print">
        <h1 className="toc-title-print">Table of Contents</h1>
        <div className="toc-entries-print">
          {entries.map((entry, index) => (
            <div key={index} className="toc-entry-print">
              <div className="toc-entry-info-print">
                <h3 className="toc-entry-title-print">{entry.title}</h3>
                <div className="toc-entry-meta-print">
                  <span className="toc-entry-date-print">
                    📅 {new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {entry.author && (
                    <span className="toc-entry-author-print">✍️ {entry.author}</span>
                  )}
                </div>
              </div>
              <div className="toc-entry-page-print">Page {index + 3}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Entry Pages */}
      {entries.map((entry, index) => (
        <div key={index} className="print-page entry-page-print">
          <div className="entry-header-print">
            <h1 className="entry-title-print">{entry.title}</h1>
            <div className="entry-meta-print">
              <span className="entry-date-print">
                📅 {new Date(entry.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              {entry.author && (
                <span className="entry-author-print">✍️ {entry.author}</span>
              )}
            </div>
          </div>
          <div className="entry-content-print markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Hide videos in print
                a: ({ node, href, children, ...props }) => {
                  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
                  const match = href?.match(youtubeRegex);
                  
                  if (match) {
                    return (
                      <div className="video-wrapper" style={{ display: 'none' }}>
                        <p>[Video: {children}]</p>
                      </div>
                    );
                  }
                  
                  return <a href={href} {...props}>{children}</a>;
                }
              }}
            >
              {entry.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      <style jsx global>{`
        /* Print Button Container */
        .print-button-container {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 1000;
        }

        .print-page-button {
          padding: 1rem 2rem;
          background: #d4af37;
          color: #000000;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
          transition: all 0.3s ease;
          letter-spacing: 0.05em;
        }

        .print-page-button:hover {
          background: #ffffff;
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
        }

        .print-page-button:active {
          transform: translateY(0);
        }

        /* Print Page Styles */
        .print-document {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 0;
          background: white;
          color: black;
        }

        .print-page {
          width: 8.5in;
          min-height: 11in;
          margin: 0 auto 2rem;
          padding: 1in;
          background: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          page-break-after: always;
          box-sizing: border-box;
        }

        .print-page > * {
          margin-top: 0;
          padding-top: 0;
        }

        .print-page > *:first-child {
          padding-top: 0;
        }

        /* Cover Page */
        .cover-page-print {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .cover-content-print h1 {
          font-size: 3rem;
          margin-bottom: 2rem;
          color: #000;
        }

        .cover-content-print h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #000;
        }

        .cover-content-print h3 {
          font-size: 1.5rem;
          color: #000;
        }

        .cover-content-print p {
          color: #000;
        }

        /* Table of Contents */
        .toc-page-print {
          font-family: Georgia, 'Times New Roman', serif;
        }

        .toc-title-print {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          border-bottom: 3px solid #000;
          padding-bottom: 0.5rem;
          color: #000;
        }

        .toc-entries-print {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .toc-entry-print {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 1rem;
          border-bottom: 1px solid #000;
        }

        .toc-entry-info-print {
          flex: 1;
        }

        .toc-entry-title-print {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: #000;
          font-weight: 700;
        }

        .toc-entry-meta-print {
          display: flex;
          gap: 1.5rem;
          font-size: 0.9rem;
          color: #000;
        }

        .toc-entry-date-print::before,
        .toc-entry-author-print::before,
        .entry-date-print::before,
        .entry-author-print::before {
          filter: grayscale(100%);
        }

        .toc-entry-page-print {
          font-weight: 700;
          font-size: 1.1rem;
          color: #000;
          white-space: nowrap;
          margin-left: 2rem;
        }

        /* Entry Pages */
        .entry-page-print {
          font-family: Georgia, 'Times New Roman', serif;
        }

        .entry-header-print {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #000;
        }

        .entry-title-print {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #000;
        }

        .entry-meta-print {
          display: flex;
          gap: 2rem;
          font-size: 1rem;
          color: #000;
        }

        .entry-content-print {
          line-height: 1.8;
          color: #000;
        }

        .entry-content-print h1 {
          font-size: 2rem;
          margin: 2rem 0 1rem;
          color: #000;
          border-bottom: 2px solid #000;
          padding-bottom: 0.5rem;
        }

        .entry-content-print h2 {
          font-size: 1.75rem;
          margin: 1.75rem 0 0.75rem;
          color: #000;
        }

        .entry-content-print h3 {
          font-size: 1.5rem;
          margin: 1.5rem 0 0.75rem;
          color: #000;
        }

        .entry-content-print h4 {
          font-size: 1.25rem;
          margin: 1.25rem 0 0.5rem;
          color: #000;
        }

        .entry-content-print p {
          margin: 1rem 0;
          text-align: justify;
          color: #000;
        }

        .entry-content-print ul,
        .entry-content-print ol {
          margin: 1rem 0;
          padding-left: 2rem;
          color: #000;
        }

        .entry-content-print li {
          margin: 0.5rem 0;
          color: #000;
        }

        .entry-content-print a {
          color: #0066cc !important;
          text-decoration: underline;
        }

        .entry-content-print code {
          background: #e8e8e8 !important;
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #c7254e !important;
          border: 1px solid #bbb !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        .entry-content-print pre {
          background: #e8e8e8 !important;
          padding: 1rem;
          border-radius: 5px;
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid #bbb !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        .entry-content-print pre code {
          background: transparent !important;
          padding: 0;
          color: #333 !important;
          border: none !important;
        }

        .entry-content-print table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .entry-content-print table th,
        .entry-content-print table td {
          border: 1px solid #000;
          padding: 0.75rem;
          text-align: left;
          color: #000;
        }

        .entry-content-print table th {
          background: #f5f5f5;
          font-weight: 700;
          color: #000;
        }

        .entry-content-print blockquote {
          border-left: 4px solid #000;
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: #000;
          font-style: italic;
        }

        .entry-content-print img {
          max-width: 100%;
          height: auto;
          margin: 1.5rem 0;
          display: block;
        }

        .entry-content-print hr {
          border: none;
          border-top: 2px solid #000;
          margin: 2rem 0;
        }

        /* Print-specific styles */
        @media print {
          /* Force color printing for backgrounds and text */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Hide print button when printing */
          .no-print,
          .print-button-container {
            display: none !important;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }

          .print-document {
            margin: 0 !important;
            padding: 0 !important;
          }

          .print-page {
            width: 100% !important;
            min-height: auto;
            margin: 0 !important;
            padding: 1in !important;
            box-shadow: none;
            page-break-after: always;
            box-sizing: border-box !important;
          }

          .print-page:last-child {
            page-break-after: auto;
          }

          /* Ensure content that overflows gets new pages with proper margins */
          .entry-content-print {
            orphans: 3;
            widows: 3;
          }

          .entry-content-print > * {
            page-break-inside: avoid;
          }

          .entry-content-print h1,
          .entry-content-print h2,
          .entry-content-print h3,
          .entry-content-print h4 {
            page-break-after: avoid;
            page-break-inside: avoid;
          }

          .entry-content-print table,
          .entry-content-print pre,
          .entry-content-print blockquote {
            page-break-inside: avoid;
          }

          /* Hide videos and iframes */
          .video-wrapper,
          iframe,
          video {
            display: none !important;
          }

          /* Convert emojis to grayscale for professional print appearance */
          .toc-entry-date-print,
          .toc-entry-author-print,
          .entry-date-print,
          .entry-author-print {
            filter: grayscale(100%) !important;
            -webkit-filter: grayscale(100%) !important;
          }

          /* Remove default browser headers and footers - set size to match content */
          @page {
            size: letter;
            margin: 0;
          }
        }

        /* Screen view (preview before printing) */
        @media screen {
          body {
            background: #f0f0f0;
            padding: 2rem 0;
          }
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  const entriesDirectory = path.join(process.cwd(), 'entries');
  const filenames = fs.readdirSync(entriesDirectory);

  // Read cover page
  const coverPath = path.join(entriesDirectory, 'cover.md');
  const coverFileContents = fs.readFileSync(coverPath, 'utf8');
  const coverMatter = matter(coverFileContents);

  // Read prenibs page
  let prenibsContent = null;
  let prenibsData = null;
  const prenibsPath = path.join(entriesDirectory, 'prenibs.md');
  if (fs.existsSync(prenibsPath)) {
    const prenibsFileContents = fs.readFileSync(prenibsPath, 'utf8');
    const prenibsMatter = matter(prenibsFileContents);
    prenibsContent = prenibsMatter.content;
    prenibsData = {
      title: prenibsMatter.data.title || '',
      date: String(prenibsMatter.data.date || ''),
      author: prenibsMatter.data.author || ''
    };
  }

  // Read all entries (excluding cover.md and prenibs.md)
  const entries = filenames
    .filter(filename => filename.endsWith('.md') && filename !== 'cover.md' && filename !== 'prenibs.md')
    .map(filename => {
      const filePath = path.join(entriesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        date: String(data.date),
        author: data.author || '',
        content: content
      };
    })
    // Sort by date (oldest first)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    props: {
      coverContent: coverMatter.content,
      coverData: {
        title: coverMatter.data.title || '',
        date: String(coverMatter.data.date || ''),
        author: coverMatter.data.author || ''
      },
      prenibsContent,
      prenibsData,
      entries
    }
  };
}
