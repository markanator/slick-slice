import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // pc name
  name: 'topping',
  // human name
  title: 'Toppings',
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
      title: 'Topping Name',
      // sanity stypes
      type: 'string',
      // human description
      description: 'What is the name of the Topping?',
    },
    {
      // pc name
      name: 'vegetarian',
      // human name
      title: 'Vegetarian',
      // sanity stypes
      type: 'boolean',
      // human description
      description: 'What is the name of the Topping?',
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ name, vegetarian }) => ({
      title: `${name} ${vegetarian ? '🌿' : ''}`,
    }),
  },
};
