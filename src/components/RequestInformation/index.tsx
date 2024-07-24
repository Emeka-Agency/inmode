import React from 'react';
import { Link } from 'gatsby';

import "./index.css";

const RequestInformation = ({search, hash, variant = "teal"}:RequestInformation_Interface) => {
    return (
        <Link
            data-variant={variant}
            className="request-informations user-select-none"
            to={`/contact${search ? '?' + search : ''}${hash ? '#' + hash : ''}`}
            title="Plus d'informations"
        >
            <span>plus d'informations</span>
        </Link>
    );
};

interface RequestInformation_Interface {
    search?: string;
    hash?: string;
    variant?: string;
};

export default RequestInformation;