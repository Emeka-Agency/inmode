export const add_product_datas = (products = [], datas = {}) => {
    products.map((product, key_product) => {
        Object.keys(datas).map((key) => {
            datas[key].map((data, data_key) => {
                if(data.product === product.mysqlId) {
                    product[key] = data;
                }
            });
        })
    });
    return products;
};