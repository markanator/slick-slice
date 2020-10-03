import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

// if you want data to stay, you have to wrap root element to persist it
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
