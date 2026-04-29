import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogData } from '../blogData';
import Navbar from './Navbar';

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = blogData.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="error-container" style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <h2>Blog Not Found</h2>
        <p>Sorry, the article you are looking for does not exist.</p>
        <Link to="/" className="btn-primary btn-solid">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="blog-details-page">
      <Helmet>
        <title>{blog.title} | Aura Dining Blog</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Navbar onLoginClick={() => {}} user={null} onLogout={() => {}} searchQuery="" onSearchChange={() => {}} onBookingsClick={() => {}} />

      <div className="blog-hero" style={{ backgroundImage: `url(${blog.image})` }}>
        <div className="blog-hero-overlay">
          <div className="container">
            <span className="blog-category">{blog.category}</span>
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-meta">
              <span>By {blog.author}</span>
              <span className="dot-separator">•</span>
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <article className="blog-content glass-card">
          <div className="blog-body">
            {blog.content}
          </div>
          <div className="blog-footer">
            <Link to="/" className="back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Chronicles
            </Link>
          </div>
        </article>
      </div>

      <style jsx>{`
        .blog-details-page {
          background: var(--bg-dark);
          min-height: 100vh;
        }

        .blog-hero {
          height: 60vh;
          min-height: 400px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
        }

        .blog-hero-overlay {
          width: 100%;
          padding: 4rem 0;
          background: linear-gradient(to top, var(--bg-dark) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
        }

        .blog-category {
          display: inline-block;
          background: var(--primary);
          color: var(--bg-dark);
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }

        .blog-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: white;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
        }

        .dot-separator {
          color: var(--primary);
        }

        .blog-content {
          margin: -4rem auto 4rem;
          padding: 4rem;
          position: relative;
          z-index: 10;
          max-width: 900px;
        }

        .blog-body {
          color: var(--text-main);
          font-size: 1.25rem;
          line-height: 2;
          white-space: pre-line;
          margin-bottom: 3rem;
        }

        .blog-footer {
          border-top: 1px solid var(--glass-border);
          padding-top: 2rem;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }

        .back-link:hover {
          transform: translateX(-5px);
          color: white;
        }

        @media (max-width: 768px) {
          .blog-hero { height: 50vh; }
          .blog-content { padding: 2rem; margin-top: -2rem; }
          .blog-body { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
};

export default BlogDetails;
