import React from "react";
import { useUser } from "../../contexts/user-provider";

const OrdersTab = ({}:OrdersTab) => {

    const user = useUser();
    
    return (
        <div id="orders-section">

        </div>
    );
};

interface OrdersTab {

};

export default OrdersTab;