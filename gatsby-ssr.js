/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react';


// import CartWrapper from './src/components/CartWrapper';

// export const wrapPageElement = ({ element, props }) => (
//   <CartWrapper {...props}>{element}</CartWrapper>
// );
// {/* SWITCH CART */}

// {/* SWITCH CART END */}

export function onRenderBody ({ setBodyAttributes }) {
  setBodyAttributes({
      className: 'no-js'
    });
};