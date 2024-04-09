import sanityClient from '@sanity/client';

const client = sanityClient({
    projectId: 'k6nr5zd9',
    dataset: 'production'
});

export default client;
