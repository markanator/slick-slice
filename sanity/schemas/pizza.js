import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

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
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topping' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      // filter out empty stuff
      const tops = Object.values(toppings).filter(Boolean);
      // console.log(toppings);
      return {
        title,
        media,
        subtitle: Object.values(tops).join(', '),
      };
    },
  },
};
