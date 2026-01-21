
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'size',
      title: 'Grid Size',
      type: 'string',
      options: {
        list: [
          { title: 'Large', value: 'large' },
          { title: 'Small', value: 'small' },
        ],
      },
      initialValue: 'small',
    },
    {
      name: 'link',
      title: 'Project Link',
      type: 'url',
    },
  ],
};
