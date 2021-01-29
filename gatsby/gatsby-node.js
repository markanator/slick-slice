import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
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
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  console.log('Turning the toppings into pages!!!');
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

// 3rd party api sourcing
// async function fetchBeersAndTurnIntoNodes({
//   actions,
//   createNodeId,
//   createContentDigest,
// }) {
//   // 1 fetch list of beers
//   const res = await fetch('https://sampleapis.com/beers/api/ale');
//   const beers = await res.json();
//   // 2 loop over each one
//   for (const beer of beers) {
//     // create a node for each beer
//     // const nodeContent = JSON.stringify(beer);
//     const nodeMeta = {
//       id: createNodeId(`beer-${beer.name}`),
//       parent: null,
//       children: [],
//       internal: {
//         type: 'Beer',
//         mediaType: 'application/json',
//         contentDigest: createContentDigest(beer),
//       },
//     };
//     // create a node for that beer
//     actions.createNode({
//       ...beer,
//       ...nodeMeta,
//     });
//   }
//   // console.log('🍺 Turn beers into nodes');
// }

// make slicemasters into pages
async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1 query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.slicemasters.nodes.forEach((slicemaster) => {
    console.log('CREATING SLICEMASTER PAGE');
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.name,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. Figure out how many pages there are based on how many slicemasters there are, and how many per page!
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(
    `=== There are ${data.slicemasters.totalCount} slicemaster and we have ${pageCount} pages with ${pageSize} per page. ===`
  );
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating slicemaster page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is pass to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
  // 5 modify query
}

export async function sourceNodes(params) {
  // fetch a list of bears and source them to gatsby
  // await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}
export async function createPages(params) {
  // create pages dynamically
  // concurrent promise waiting before moving along
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 3. slicemasters
}
