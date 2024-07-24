/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react';

import CartWrapper from './src/components/CartWrapper';
import UserWrapper from './src/components/UserWrapper';

export const wrapPageElement = ({ element, props }) => (
    <CartWrapper {...props}>
        <UserWrapper>
            {element}
        </UserWrapper>
    </CartWrapper>
);
// {/* SWITCH CART */}

// {/* SWITCH CART END */}

export function onRenderBody ({ setBodyAttributes }) {
    setBodyAttributes({
        className: 'no-js'
    });
};