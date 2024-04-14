import React, { useEffect } from 'react';
import { useTodoContext } from '../../Store/Provider';
import { Link } from 'react-router-dom';
import client, { urlFor } from '../Sanity_Client';
import { ClockLoader } from "react-spinners";


const Blog: React.FC = () => {
  const { setBlog, blog } = useTodoContext();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await client.fetch(`
          *[_type == "blog"] {
            _id,
            title,
            description,
            slug,
            image {
              asset-> {
                url,
                metadata {
                  dimensions
                }
              }
            }
          }
        `);
        setBlog(res);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [setBlog]);

  // Check if blog is not an array
  if (!Array.isArray(blog)) {
    return <div><ClockLoader color="#36d7b7" />
    </div>;
  }

  return (
    <div className="container">
      <div className="blog-grid">
        {blog.map((blogItem) => (
          <div key={blogItem._id} className="blog-card">
            <img
              src={urlFor(blogItem.image).url()}
              alt={blogItem.title}
              className="blog-image"
              width={100}
              height={100}
            />
            <div className="blog-content">
              <h2 className="blog-item-title">{blogItem.title}</h2>
              <p className="blog-item-title">{blogItem.description}</p>
              <Link to={`/blog_Slug/${blogItem.slug.current}`} className="blog-item-link">                
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
