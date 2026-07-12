import { defineConfig } from "next-sanity";
import { visionTool } from "sanity/vision";
import { structureTool } from "@sanity/structure";
import { schemaTypes } from "./schemas/schema";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
