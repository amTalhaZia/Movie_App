import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTodoContext } from '../../Store/Provider';
import client from '../Sanity_Client';


const BlogPost: React.FC = () => {
    const { slug } = useParams();
    const { setBlog, blog } = useTodoContext();

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response= await client.fetch(`*[_type == "blog" && slug.current == $slug][0]`, { slug });
                setBlog(response);
            } catch (error) {
                console.error('Error fetching blog post:', error);
            }
        };

        fetchBlogPost();
    }, [slug, setBlog]);

    return (
        <div>
            {blog && (
                <div>
                    <ul>
                        {blog.about && blog.about.map((aboutItem: { children: any[]; }, index: React.Key | null | undefined) => (
                            <li key={index}>
                                <ul>
                                    {aboutItem.children.map((child, childIndex) => (
                                        <li key={childIndex}>{child.text}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BlogPost;
