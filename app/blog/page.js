"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  return (
    <div>
      <h1>Yoga & Wellness Blog</h1>
      {blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <Link href={`/blog/${blog._id}`}>
                <a>
                  <h2>{blog.title}</h2>
                  <p>By {blog.author} | {new Date(blog.createdAt).toDateString()}</p>
                  <p>{blog.content.substring(0, 100)}...</p>  {/* Preview snippet */}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #ddd;
        }

        h2 {
          margin-bottom: 10px;
          color: #0070f3;
        }

        p {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
}
