import React from 'react';

const BlogModal = ({ isOpen, onClose, blog }) => {
  if (!isOpen || !blog) return null;

  return (
    <div className="blog-overlay" onClick={onClose}>
      <div className="blog-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close blog dialog">
          &times;
        </button>
        <div className="blog-modal-header" style={{ backgroundImage: `url(${blog.image})` }}>
          <div className="blog-modal-header-overlay">
            <span className="blog-category">{blog.category}</span>
            <h2 className="blog-title">{blog.title}</h2>
            <div className="blog-meta">
              <span>By {blog.author}</span>
              <span className="dot-separator">•</span>
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
        <div className="blog-modal-content">
          <p className="blog-body">{blog.content}</p>
        </div>
      </div>

      <style jsx>{`
        .blog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2500;
          padding: 2rem;
        }

        .blog-modal {
          position: relative;
          width: 100%;
          max-width: 800px;
          height: 90vh;
          max-height: 800px;
          background: var(--bg-dark);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
          animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1);
          border: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          color: white;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s;
        }

        .close-btn:hover {
          background: var(--primary);
          color: black;
          transform: rotate(90deg);
        }

        .blog-modal-header {
          height: 350px;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .blog-modal-header-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 3rem 2rem 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
        }

        .blog-category {
          display: inline-block;
          background: var(--primary);
          color: var(--bg-dark);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-family: 'Cinzel', serif;
          font-size: 0.8rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .blog-title {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          color: white;
          margin: 0 0 1rem 0;
          line-height: 1.2;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
        }

        .dot-separator {
          color: var(--primary);
        }

        .blog-modal-content {
          padding: 3rem;
          overflow-y: auto;
          flex: 1;
        }

        .blog-modal-content::-webkit-scrollbar {
          width: 6px;
        }
        .blog-modal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .blog-modal-content::-webkit-scrollbar-thumb {
          background: var(--glass-border);
          border-radius: 4px;
        }

        .blog-body {
          color: var(--text-main);
          font-size: 1.15rem;
          line-height: 1.9;
          white-space: pre-line;
        }

        @media (max-width: 768px) {
          .blog-modal-header { height: 250px; }
          .blog-title { font-size: 1.8rem; }
          .blog-modal-content { padding: 2rem; }
          .blog-overlay { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default BlogModal;
