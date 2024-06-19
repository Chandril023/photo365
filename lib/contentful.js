const contentful = require("contentful");

export const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  deliveryaccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  previewaccessToken:process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
});