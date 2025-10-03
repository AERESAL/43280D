import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllEntries, getCoverPage } from '../lib/posts';
import PrintButton from '../components/PrintButton';
import Sidebar from '../components/Sidebar';

export default function Home({ entries, coverPage }) {
  return (
    <>
      <Head>
        <title>Δ | 43280D</title>
        <meta name="description" content="VEX Robotics Engineering Notebook - Team 43280D" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Sidebar coverPage={coverPage} entries={entries} />

      <main className="container with-sidebar">
        <header>
          <h1>Δ | 43280D</h1>
          <div className="header-actions">
            <PrintButton />
          </div>
        </header>

        {/* Cover Page Content */}
        {coverPage && (
          <div className="print-page cover-page" id="cover-page">
            <article className="entry-content">
              <div className="markdown-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({node, ...props}) => (
                      <img {...props} style={{maxWidth: '100%', height: 'auto'}} />
                    ),
                  }}
                >
                  {coverPage.content}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        )}

        {/* All Entries Content */}
        {entries.length === 0 ? (
          <div className="no-entries-message">
            <p>No entries yet. Add Markdown files to the /entries folder.</p>
          </div>
        ) : (
          <>
            {entries.map((entry) => (
              <div key={entry.slug} className="print-page entry-page-inline" id={entry.slug}>
                <article className="entry-content">
                  <header className="entry-header">
                    <h1>{entry.title}</h1>
                    <div className="entry-meta">
                      <span className="date">📅 {entry.date}</span>
                      {entry.author && (
                        <span className="author">👤 {entry.author}</span>
                      )}
                    </div>
                  </header>

                  <div className="markdown-content">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        img: ({node, ...props}) => (
                          <img {...props} style={{maxWidth: '100%', height: 'auto'}} />
                        ),
                        a: ({node, children, href, ...props}) => {
                          // Check if it's a YouTube link
                          const youtubeMatch = href?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
                          if (youtubeMatch) {
                            return (
                              <div className="video-wrapper no-print">
                                <iframe
                                  width="100%"
                                  height="400"
                                  src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            );
                          }
                          return <a href={href} {...props}>{children}</a>;
                        },
                      }}
                    >
                      {entry.content}
                    </ReactMarkdown>
                  </div>
                </article>
              </div>
            ))}
          </>
        )}

        <footer className="no-print">
          <p>Built with Next.js for VEX Robotics</p>
        </footer>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const entries = getAllEntries();
  const coverPage = getCoverPage();

  return {
    props: {
      entries,
      coverPage,
    },
  };
}
