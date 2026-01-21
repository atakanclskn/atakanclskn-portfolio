
import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to true for production
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => {
  // Allow direct string URLs for fallback data
  if (typeof source === 'string') {
    return { url: () => source };
  }
  // If source is missing or invalid (no asset or empty ref), return a dummy object to prevent crashes
  if (!source || !source.asset || !source.asset._ref) {
    return { url: () => 'https://via.placeholder.com/800x600?text=No+Image' };
  }
  
  return builder.image(source);
};
