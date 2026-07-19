import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './schemas';

export default defineConfig({
  name:    'laptopsspecial',
  title:   'LaptopsSpecial Blog',

  // After creating new Sanity project, replace this with your project ID
  // Go to sanity.io/manage → Create Project → copy projectId
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_NEW_PROJECT_ID',
  dataset:   'production',

  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),   // ← Syntax highlighted code editor
  ],

  schema: {
    types: schemaTypes,
  },
});
