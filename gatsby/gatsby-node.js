import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  console.log('Turning the PIZZAS into PAGES!!!');

  // get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);
  // loop over each and create a page
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        // mark: 'is cool',
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // console.log("Turning the toppings into pages!!!")
  // get template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  // create page for topping
  data.toppings.nodes.forEach((topping) =>
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    })
  );
  // pass topping data to pizza.js
}

export async function createPages(params) {
  // create pages dynamically
  // concurrent promise waiting before moving along
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
  // 3. slicemasters
}
