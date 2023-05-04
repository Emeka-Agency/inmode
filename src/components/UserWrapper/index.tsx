import React from 'react';

import UserProvider from '../contexts/user-provider';

const UserWrapper = ({ children }:UserWrapper) => (
    <>
        <UserProvider>
            {children}
        </UserProvider>
    </>
);

interface UserWrapper {
  children: React.ReactNode;
};

export default UserWrapper;