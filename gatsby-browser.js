/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
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

export function onClientEntry () {
    window.addEventListener('load', () => {
        document.body.className = document.body.className.replace(/\bno-js\b/, '');
    });
}