import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../../data/blogposts.json';
import './Blog.css';

const Blog = () => {
  const [posts] = useState(blogPosts);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1 className="section-title">The Journal</h1>
        <p className="section-subtitle">Stories from the road and beyond</p>
      </div>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} />
              <span className="blog-category">{post.category}</span>
            </div>
            <div className="blog-card-content">
              <span className="blog-date">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="blog-read-more">Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;