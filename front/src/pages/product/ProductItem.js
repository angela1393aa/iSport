import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import ProductItemMain from './components/ProductItemMain/';

function ProductItem(props) {
    // console.log(props);
    const { cartAdd } = props;
    const [productId, setProductId] = useState(null);

    useEffect(() => {
        //使用網址上的id和伺服器要資料
        const paramsString = props.location.search;
        const searchParams = new URLSearchParams(paramsString);

        setProductId(searchParams.get('id'));

        // const newProduct = data.find((v) => {
        //     return v.id === id;
        // });

        // if (newProduct) setProduct(newProduct);
    }, []);

    return (
        <>
            <nav className="mt-2 text-white bg-gray-900 flex justify-center text-sm xl:text-base">
                <Link
                    to="/products/allProduct"
                    className="flex-1 sm:flex-initial w-36  text-center py-3 hover:text-yellow-400 cursor-pointer"
                >
                    所有商品
                </Link>
                <Link
                    to="/products/clothe"
                    className="flex-1 sm:flex-initial w-36 text-center py-3 hover:text-yellow-400 cursor-pointer"
                >
                    運動服飾
                </Link>
                <Link
                    to="/products/shoes"
                    className="flex-1 sm:flex-initial w-36 text-center py-3 hover:text-yellow-400 cursor-pointer"
                >
                    運動鞋類
                </Link>
                <Link
                    to="/products/equipment"
                    className="flex-1 sm:flex-initial w-36 text-center py-3 hover:text-yellow-400 cursor-pointer"
                >
                    健身器材
                </Link>
                <Link
                    to="/products/food"
                    className="flex-1 sm:flex-initial w-36 text-center py-3 hover:text-yellow-400 cursor-pointer"
                >
                    營養補給
                </Link>
            </nav>
            <ProductItemMain productId={productId} cartAdd={cartAdd} />
        </>
    );
}

export default withRouter(ProductItem);
