import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost: React.FC = () => {
    const { slug } = useParams(); // Access the slug parameter

    // Use the slug to fetch data or display content
    return (
        <div>
            <h2>Blog Post: {slug}</h2>
            {/* Display post content based on slug */}
        </div>
    );
};

export default BlogPost;
