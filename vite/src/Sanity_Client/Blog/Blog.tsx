import React, { useEffect } from 'react';
import client from '../Sanity_Client';
import { useTodoContext } from '../../Store/Provider';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const { setBlog, blog } = useTodoContext();

  useEffect(() => {
    client.fetch(
      `*[_type == "blog"] {
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
      }`
    ).then(res => {
      console.log(res);
      setBlog(res); 
    }).catch(error => {
      console.error("Error fetching blog data:", error);
    });
  }, [setBlog]);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {blog.map((blogItem) => (
          <li key={blogItem._id}>
            <h2>{blogItem.title}</h2>
            <p>{blogItem.description}</p>
            <img src={blogItem.image[0]?.url} alt={blogItem.title} />
            <p>
              <Link to={`/blog/${blogItem.slug}`}>Read More</Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
