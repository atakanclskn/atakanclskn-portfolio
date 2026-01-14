import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'techStack',
  title: 'Tech Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'tech',
      title: 'Technologies',
      type: 'string',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name (Lucide)',
      type: 'string',
      description: 'e.g. Box, Database, Cpu, Palette',
    }),
    defineField({
      name: 'color',
      title: 'Tailwind Color Class',
      type: 'string',
      description: 'e.g. text-cyan-400',
    }),
  ],
});