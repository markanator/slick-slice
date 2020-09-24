import { MdLocalPizza as icon } from 'react-icons/md';

export default {
  // pc name
  name: 'pizza',
  // human name
  title: 'Pizzas',
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
      title: 'Pizza Name',
      // sanity stypes
      type: 'string',
      // human description
      description: 'Name of the pizza',
    },
    {
      // pc name
      name: 'slug',
      // human name
      title: 'Slug',
      // sanity stypes
      type: 'slug',
      // human description
      // description: 'Name of the pizza',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      // pc name
      name: 'image',
      // human name
      title: 'Image',
      // sanity stypes
      type: 'image',
      // human description
      // description: 'Name of the pizza',
      options: {
        hotspot: true,
      },
    },
    {
      // pc name
      name: 'price',
      // human name
      title: 'Price',
      // sanity stypes
      type: 'number',
      // human description
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000),
      // TODO: add custom input component
    },
  ],
};
