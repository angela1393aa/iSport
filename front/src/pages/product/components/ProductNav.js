import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductNav(props) {
    const { setRefresh, refresh } = props;
    const { category } = useParams();

    const isCurrent = (current) => {
        if (current === category) {
            return 'flex-1 sm:flex-initial border-b-2 border-yellow-400  hover:border-yellow-400 w-36 text-white text-center py-5';
        } else {
            return 'flex-1 sm:flex-initial border-b-2 border-transparent hover:border-yellow-400 w-36 text-white text-center py-5';
        }
    };

    const handelRefresh = () => {
        refresh ? setRefresh(false) : setRefresh(true);
    };

    return (
        <>
            <nav className="bg-gray-900 flex justify-center text-sm sm:text-base">
                <Link
                    to="/products/allProduct"
                    onClick={handelRefresh}
                    className={isCurrent('allProduct')}
                >
                    所有商品
                </Link>
                <Link
                    to="/products/clothe"
                    onClick={handelRefresh}
                    className={isCurrent('clothe')}
                >
                    運動服飾
                </Link>
                <Link
                    to="/products/shoes"
                    onClick={handelRefresh}
                    className={isCurrent('shoes')}
                >
                    運動鞋類
                </Link>
                <Link
                    to="/products/equipment"
                    onClick={handelRefresh}
                    className={isCurrent('equipment')}
                >
                    健身器材
                </Link>
                <Link
                    to="/products/food"
                    onClick={handelRefresh}
                    className={isCurrent('food')}
                >
                    營養補給
                </Link>
            </nav>
        </>
    );
}

export default ProductNav;
