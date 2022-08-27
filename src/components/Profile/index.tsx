import React from "react";
import { useUser } from "../contexts/user-provider";

import "./index.css";
import OrdersTab from "./tabs/orders";
import OverviewTab from "./tabs/overview";
import AddressesTab from "./tabs/address";
import { clean_url_search, get_url_search, set_url_search } from "../../functions/tools";

const tabs:any = {
    "overview" : "Général",
    "orders": "Commandes",
    "addresses": "Adresses",
};

const Profile = ({}:Profile) => {

    const [current, setCurrent]:[string, React.Dispatch<string>] = React.useState("overview");

    const changeTab = function(_tab:string|null = null) {
        typeof _tab == 'string' && setCurrent(_tab);
        clean_url_search();
        set_url_search(`?tab=${['g', 'c', 'a'][['overview', 'orders', 'addresses'].indexOf(_tab || 'overview')]}`)
    };
    
    const user = useUser();
    
    React.useEffect(() => {
        let _params = get_url_search();
        // clean_url_search();
        if('tab' in _params) {
            switch(_params['tab']) {
                case 'g': changeTab('overview');
                case 'c': changeTab('orders');
                case 'a': changeTab('addresses');
            };
        }
    }, []);

    return (
        <section id="profile">
            <div id="profile-tabs">
                {Object.keys(tabs).map((key:string, index:number) => 
                    <div
                        key={index}
                        className={`profile-tab${current == key ? " current" : ""}`}
                        onClick={(e) => {
                            setCurrent(key);
                            clean_url_search();
                            set_url_search(`?tab=${['g', 'c', 'a'][['overview', 'orders', 'addresses'].indexOf(key)]}`)
                        }}
                    >
                        {tabs[key]}
                    </div>
                )}
            </div>
            <div id="profile-content">
                {current == "overview" && <OverviewTab/>}
                {current == "orders" && <OrdersTab/>}
                {current == "addresses" && <AddressesTab/>}
            </div>
        </section>
    );
};

interface Profile {

};

export default Profile;