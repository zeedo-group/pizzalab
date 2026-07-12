import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function getAllPizzas() {
  return client.fetch(`*[_type == "pizza"]{_id, name, slug, category, description, price, image, popular}`);
}

export async function getPizzaBySlug(slug: string) {
  return client.fetch(`*[_type == "pizza" && slug.current == $slug][0]{_id, name, slug, category, description, price, image, popular}`, { slug });
}
