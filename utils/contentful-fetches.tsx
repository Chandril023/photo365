import getBase64ImageUrl from "@/lib/generate-blur-placeholder";
import { client } from "./contentful-client";
import GetImageDetails from "./get-image-details";
import { ImageProps, ImageSeriesProps } from "./types";

// ReduceImages function to reduce the image data
async function reduceImages(results: any): Promise<ImageProps[]> {
  const reducedResults: ImageProps[] = [];
  for (const [i, result] of results.items.entries()) {
    reducedResults.push({
      id: i,
      idc: result.sys.id,
      height: result.fields.photo[0].fields.file.details.image.height,
      src: result.fields.photo[0].fields.file.url,
      width: result.fields.photo[0].fields.file.details.image.width,
      placeholder: result.fields.photoTitle,
      alt: result.fields.photoTitle,
      date: result.fields.date,
      blurDataURL: await getBase64ImageUrl(result.fields.photo[0].fields.file.url),
    });
  }
  return reducedResults;
}

// Fetching photographs
export async function getDataPhotographs() {
  try {
    const results = await client.getEntries({
      content_type: "photograph",
      order: "-sys.updatedAt",
    });

    if (!results.items) {
      throw new Error("No photographs found");
    }

    const images = await reduceImages(results);
    return {
      props: {
        images,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch photographs:", error.message);
    } else {
      console.error("Failed to fetch photographs:", error);
    }
    throw new Error("Failed to fetch photographs");
  }
}

// Creates a slug from the title
function slug(str: string): string {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  const to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

// Fetching photography series
export async function getPhotoSeries() {
  try {
    const results = await client.getEntries({
      content_type: "photographySeries",
      order: "-sys.createdAt",
    });

    if (!results.items) {
      throw new Error("No photography series found");
    }

    const reducedResults: ImageSeriesProps[] = [];
    for (const [i, result] of results.items.entries()) {
      const photos = result.fields.photos;
      const images = await reduceImages({ items: photos });

      reducedResults.push({
        id: i,
        idc: result.sys.id,
        slug: result.fields.slug
          ? slug(result.fields.slug)
          : slug(result.fields.seriesTitle),
        src: result.fields.coverImage.fields.file.url,
        placeholder: result.fields.seriesTitle,
        description: result.fields.description,
        seriesTitle: result.fields.seriesTitle,
        blurDataURL: undefined,
        alt: "",
        date: "",
        images,
      });
    }

    return GetImageDetails(reducedResults);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch photography series:", error.message);
    } else {
      console.error("Failed to fetch photography series:", error);
    }
    throw new Error("Failed to fetch photography series");
  }
}
