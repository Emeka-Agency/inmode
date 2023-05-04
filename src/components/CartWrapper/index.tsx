import React from 'react';

import CartProvider from '../contexts/cart-provider';

const CartWrapper = ({ children }:CartWrapper) => (
    <>
        <CartProvider>
            {children}
        </CartProvider>
    </>
);

interface CartWrapper {
  children: React.ReactNode;
};

export default CartWrapper;