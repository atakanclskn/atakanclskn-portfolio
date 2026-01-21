
export default {
  name: 'techStack',
  title: 'Tech Stack',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'tech',
      title: 'Technologies',
      type: 'string',
    },
    {
      name: 'iconName',
      title: 'Icon Name (Lucide)',
      type: 'string',
      description: 'e.g. Box, Database, Cpu, Palette',
    },
    {
      name: 'color',
      title: 'Tailwind Color Class',
      type: 'string',
      description: 'e.g. text-cyan-400',
    },
  ],
};
