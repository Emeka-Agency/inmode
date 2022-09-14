import React from "react";
import ShopProduct2 from "./shop-product";
import ShopMenu from "./shop-menu";
import { InmodePanel_ShopGroup_Interface } from "../interfaces";

const WPShop = ({ products, special, shop_card }:WPShop) => {

    const [tags, setTags] = React.useState([]);

    const filter = (e:React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        e.preventDefault();
        e.currentTarget.classList.toggle('selected');
        let temp = new Array(...tags);
        if(tags.indexOf(e.currentTarget.dataset.value) < 0) {
            temp.push(e.currentTarget.dataset.value);
        }
        else {
            temp = temp.map((tag) => {
                if(e.currentTarget.dataset.value === tag) {
                    return false;
                }
                return tag;
            }).filter(tag => tag);
        }
        setTags(temp);
    }

    return (
        <div className={`shopping-menu main-container ${shop_card}`}>
            <div className="menu">
                <ShopMenu products={products} filter={filter} tags={tags}/>
            </div>
        <div className={`${shop_card}-products${special ? " special" : ""}`}>
            {/* ///////////////////////////////////////// */}
            {products instanceof Array && products.map((group:InmodePanel_ShopGroup_Interface, group_key) => {
                if(tags.length === 0 || tags.indexOf(group.fieldValue) >= 0) {
                return (
                    <div key={group_key} className="shop-addon">
                    <div className="addon-name">{group.fieldValue}</div>
                    {group.nodes.map((product, key) => {
                        return (
                            <ShopProduct2
                                key={`${group_key}-${key}`}
                                reference={product.reference || ""}
                                special={special}
                                wp_id={product.wp_id || -1}
                            />
                        );
                    })}
                    </div>
                );
                }
                return <></>;
            })}
        </div>
    </div>
  );
}

interface WPShop {
    products: InmodePanel_ShopGroup_Interface[];
    special: any;
    shop_card: string;
};

export default WPShop;