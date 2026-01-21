
export default {
  name: 'social',
  title: 'Social Link',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: 'Platform Name',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username / Short Text',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
};
