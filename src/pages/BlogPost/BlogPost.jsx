import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import blogPosts from '../../data/blogposts.json';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="blog-post-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="blog-post-hero">
        <div 
          className="blog-post-bg"
          style={{ backgroundImage: `url(${post.image})` }}
        >
          <div className="blog-post-overlay" />
        </div>
        
        <button className="back-button" onClick={() => navigate('/blog')}>
          <FaArrowLeft />
          <span>Back to Journal</span>
        </button>

        <div className="blog-post-header">
          <span className="blog-post-category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span>{post.date}</span>
            <span>|</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </div>

      <div className="blog-post-content">
        <div className="blog-post-body">
          <p>{post.content}</p>
        </div>
        
        <div className="blog-post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;