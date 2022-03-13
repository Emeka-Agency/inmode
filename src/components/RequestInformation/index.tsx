import React from 'react';
import { Link } from 'gatsby';

const RequestInformation = ({search, hash}:RequestInformation_Interface) => {
    // console.log(typeof window == "undefined" ? null : window.location);
    return (
        <Link
            className="request-informations"
            to={`/contact${search ? '?' + search : ''}${hash ? '#' + hash : ''}`}
            title="Plus d'informations"
        >
            plus d'informations
        </Link>
    );
};

interface RequestInformation_Interface {
    search?: string;
    hash?: string;
};

export default RequestInformation;