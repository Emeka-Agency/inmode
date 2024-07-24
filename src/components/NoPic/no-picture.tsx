import React from 'react';

import  './index.css';
import { no_pics } from './const';

const NoPicture = ({from}:NoPicture) => {
    return (
        <div className="no-picture">
            {no_pics[from]}
        </div>
    );
};

interface NoPicture {
    from: 'addon-before-after'|'addon-videos'|'product-addons'|'treatment-before-after';
};

export default NoPicture;