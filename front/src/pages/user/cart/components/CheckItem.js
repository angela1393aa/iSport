import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../utils/config';

function CheckItem(props) {
    const [error, setError] = useState('');
    const { myCart } = props;

    return (
        <>
            {myCart &&
                myCart.map((item) => {
                    return (
                        <div
                            className="sm:p-2.5 h-180 lg:p-4 p-1.5 flex flex-row"
                            key={item.product_sku_id}
                        >
                            <figure className="sm:w-36 w-16 sm:mx-5 mx-0 self-center object-cover overflow-hidden flex-shrink-0">
                                <img
                                    className="w-full"
                                    // 引入圖片
                                    src={
                                        require('../../../../images/product/' +
                                            item.img.img_name).default
                                    }
                                    alt={item.img.img_name}
                                ></img>
                            </figure>
                            <div className="flex flex-col flex-grow lg:ml-10 ml-5">
                                <div className="flex flex-row justify-between pb-2.5">
                                    <h3 className="sm:text-xl text-base font-bold break-words mr-4">
                                        {item.product_name}
                                    </h3>
                                    <p className="text-yellow-400 font-bold">
                                        ${item.amount.toLocaleString()}
                                    </p>
                                </div>
                                <div className="pb-1.5 text-sm text-yellow-400">
                                    {item.brand_name}
                                </div>
                                {item.typeValue.map((value) => {
                                    return (
                                        <div
                                            className="flex flex-row items-center pb-1.5"
                                            key={value.type_id}
                                        >
                                            <p className="sm:mr-2.5 mr-6">
                                                {value.type_name}：
                                            </p>
                                            <div className="px-4 text-white text-opacity-85 text-center text-sm">
                                                {value.type_value}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="flex flex-row items-center">
                                    <p className="mr-2.5">數量：</p>
                                    <div className="w-16 px-4 mr-2.5 border-l-2 border-transparent rounded-md flex items-center">
                                        <p>{item.qty}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}

export default CheckItem;
