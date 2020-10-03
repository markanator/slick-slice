import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;

    .count {
      background: white;
      padding: 2px 5px;
    }

    &.active,
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return pizzas array
  const counts = pizzas
    .map((pizzas) => pizzas.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        // if yes incremenet
        // otherwise create a new entry
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort based on counts
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // get a list of all the toppings
  // get a list of all the pizzas with toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  // count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  return (
    <ToppingsStyles>
      <Link to="/pizzas/">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
