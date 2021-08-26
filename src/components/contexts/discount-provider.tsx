import React, { ReactChild, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { _sort_html_list, _sort_object } from '../../functions/sort';

import {
    hashString,
} from 'react-hash-string';

import '../interfaces';
import {
    InmodePanel_Discount_Interface,
    DiscountContext_Interface,
    Discount_Interface,
} from '../interfaces';
import DiscountContext from './discount-context';

export const useDiscount = ():DiscountContext_Interface => {
    return useContext(DiscountContext);
}

const DiscountProvider = ({ requested = "", children }:{requested:string, children:ReactChild}):React.Provider<DiscountContext_Interface> => {

    const [discounts] = React.useState({}
        // Object.fromEntries(
        //     useStaticQuery(graphql`
        //     {
        //         allStrapiDiscount {
        //             nodes {
        //                 discount
        //                 type
        //                 single_use
        //                 textual
        //                 text
        //                 articles {
        //                     id
        //                     price
        //                     reference
        //                 }
        //             }
        //         }
        //     }
        //     `).allStrapiDiscount.nodes.map((discount:InmodePanel_Discount_Interface) => {
        //         console.log(discount);
        //         return discount;
        //     }),
        // ),
    );

    const [discounts_length]:[number, React.Dispatch<number>] = React.useState(discounts.length);

    const discount_base = (hashid:string, qnt:number):Discount_Interface => {
        return {
            id: discounts[hashid].strapiId,
            discount: discounts[hashid].discount,
            type: discounts[hashid].type,
            single_use: discounts[hashid].single_use,
            textual: discounts[hashid].textual,
            text: discounts[hashid].text,
            articles: discounts[hashid].articles,
            is_ref(hashid:string):boolean {return hashid === this.hashid;},
            // 'delete': (function() {
            //     // console.log("HARA KIRI KIRI !")
            //     delete this;
            // })
        };
    }


    const discount_index = (hashid:string):number => {
        return discounts.map((item:Discount_Interface, key) => {
            return item.is_ref(hashid) ? key : 0;
        }).reduce((a, b) => {return a + b;});
    }

    const find_in_discounts = (hashid:string):Discount_Interface | undefined | null => {
        if(!hashid) {
            return null;
        }
        if(typeof hashid != 'string') {
            return null;
        }
        return discounts[hashid] || null;
    }


    const nb_discounts = ():number => {
        return discounts_length;
    }

    const createHashid = (_id:string):string => {
        return hashString(_id).toString();
    };

    return (
        <DiscountContext.Provider
            value={{
                discounts: discounts,
                discount_index: discount_index,
                find_in_discounts: find_in_discounts,
                nb_discounts: nb_discounts,
            }}
        >
            {children}
        </DiscountContext.Provider>
    );
}

export default DiscountProvider;

