import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost: React.FC = () => {
    const { slug } = useParams(); 

    return (
        <div>
            <h2>Blog Post: {slug}</h2>
        </div>
    );
};

export default BlogPost;
