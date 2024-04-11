import { defineType, defineField } from 'sanity';

export const Blog = defineType({
    title: 'Blog',
    name: 'blog',
    type: 'document',
    fields: [
        defineField({
            title: "Blog Image",
            name: "image",
            type: "image",
            options: {
                hotspot: false
            }
        }),
        defineField({
            title: 'Blog Title',
            name: 'title',
            type: 'string'
        }),
        defineField({
            title: 'Blog Description',
            name: 'description',
            type: 'string'
        }),
        defineField({
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title', 
                maxLength: 200, 
                slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200) 
            }
        }),
        defineField({
            title: 'About',
            name: 'about',
            type: 'array', 
            of: [{ type: 'block' }] 
        })
    ]
});
