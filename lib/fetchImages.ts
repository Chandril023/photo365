import type { ImagesResults } from "@/models/Images";
import { ImagesSchemaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(url: string): Promise<ImagesResults | undefined> {
    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${env.PEXELS_API_KEY}`
            }
        });

        if (!res.ok) {
            throw new Error(`Fetch Images error! HTTP status ${res.status}`);
        }
        const imagesResults: ImagesResults = await res.json();
        // Validate and parse data using Zod schema
        const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);

        // Check if there are no results
        if (parsedData.total_results === 0) {
            return undefined;
        }

        return parsedData;
    } catch (error) {
        console.error('Error in fetchImages:', error);
        return undefined; // Handle error gracefully, return undefined or handle differently as needed
    }
}
