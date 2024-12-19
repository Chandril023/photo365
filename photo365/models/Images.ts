import { z } from 'zod';

const BasicImageSchema = z.object({
    page: z.number(),
    per_page: z.number(),
    prev_page: z.string().optional(),
    next_page: z.string().optional(),
    total_results: z.number(),
});

const PhotoSchema = z.object({
    id: z.number(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
    src: z.object({
        large: z.string(),
    }),
    alt: z.string(),
    blurredDataUrl: z.string().optional(),
});

export const ImagesSchemaWithPhotos = BasicImageSchema.extend({
    photos: z.array(PhotoSchema),
});

export type Photo = z.infer<typeof PhotoSchema>;

export type ImagesResults = z.infer<typeof ImagesSchemaWithPhotos>;

async function fetchImages(url: string): Promise<ImagesResults> {
    const apiKey = process.env.PEXELS_API_KEY; // Replace with your actual Pexels API key

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching images: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data to inspect its structure
        return ImagesSchemaWithPhotos.parse(data); // Validate data with Zod schema
    } catch (error) {
        console.error('Fetch Images error!', error);
        throw error;
    }
}

export default fetchImages;
