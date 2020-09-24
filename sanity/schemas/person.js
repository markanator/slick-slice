import { MdPerson as icon } from 'react-icons/md';

export default {
  // pc name
  name: 'person',
  // human name
  title: 'Slicemasters',
  // type of
  type: 'document',
  // icon
  icon,
  // input fields
  fields: [
    {
      // pc name
      name: 'name',
      // human name
      title: 'Name',
      // sanity stypes
      type: 'string',
    },
    {
      // pc name
      name: 'slug',
      // human name
      title: 'Slug',
      // sanity stypes
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      // pc name
      name: 'description',
      // human name
      title: 'Description',
      // sanity stypes
      type: 'text',
      description: 'Tell us a little bit about them.',
    },
    {
      // pc name
      name: 'image',
      // human name
      title: 'image',
      // sanity stypes
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
