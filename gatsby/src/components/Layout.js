import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
