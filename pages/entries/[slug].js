import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { getAllSlugs, getEntryBySlug, getCoverPage } from '../../lib/posts';
import PrintButton from '../../components/PrintButton';
import TOC from '../../components/TOC';

export default function Entry({ entry, isCover }) {
  const title = isCover ? 'Cover Page' : entry.title;

  return (
    <>
      <Head>
        <title>{title} - VEX Notebook</title>
        <meta name="description" content={title} />
      </Head>

      <main className="container entry-page">
        <nav className="breadcrumb no-print">
          <Link href="/">← Back to Notebook</Link>
        </nav>

        <div className="header-actions no-print">
          <PrintButton />
        </div>

        <div className="print-page">
          <article className="entry-content">
            {!isCover && (
              <header className="entry-header">
                <h1>{entry.title}</h1>
                <div className="entry-meta">
                  <span className="date">📅 {entry.date}</span>
                  {entry.author && (
                    <span className="author">👤 {entry.author}</span>
                  )}
                </div>
              </header>
            )}

            {!isCover && <TOC content={entry.content} />}

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
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllSlugs();
  
  // Add cover page path
  paths.push({
    params: { slug: 'cover' },
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  if (slug === 'cover') {
    const coverPage = getCoverPage();
    return {
      props: {
        entry: coverPage || { content: '# Cover Page\n\nNo cover page found.' },
        isCover: true,
      },
    };
  }

  const entry = getEntryBySlug(slug);

  return {
    props: {
      entry,
      isCover: false,
    },
  };
}
