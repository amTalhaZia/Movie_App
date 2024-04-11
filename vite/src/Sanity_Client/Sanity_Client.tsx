import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
    projectId: 'k6nr5zd9',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2021-08-31'
});

const builder = imageUrlBuilder(client); 

export function urlFor(source: any) {
    return builder.image(source);
}

export default client;
