import React, { useState, useEffect } from 'react';

import { FaPlus, FaMinus, FaAngleLeft, FaHeart, FaShare } from 'react-icons/fa';

function SkuInfo(props) {
    const { skuInfo, qty, setQty } = props;
    return (
        <>
            <div className="py-1 flex justify-between">
                <div>
                    貨號：
                    <span className="text-gray-400">
                        {skuInfo ? skuInfo.sku_code : '暫無資料'}
                    </span>
                </div>
                <div>
                    庫存：
                    <span>{skuInfo ? skuInfo.stock : '暫無資料'}</span>
                </div>
            </div>
            <div className="my-2 py-2 border-b-2 border-yellow-400 flex justify-between">
                <div className="text-yellow-400 text-lg">
                    NT$
                    <span>{skuInfo ? skuInfo.price : '暫無資料'}</span>
                </div>
                <div className="flex py-1 rounded-md justify-between items-center shadow-emboss">
                    <button
                        onClick={() => {
                            if (qty < skuInfo.stock) setQty(qty + 1);
                        }}
                        type="button"
                        className="px-2"
                    >
                        <FaPlus className="hover:text-yellow-400" />
                    </button>
                    <input
                        type="text"
                        className=" w-20 xl:w-auto bg-transparent outline-none text-center"
                        value={qty}
                    />
                    <button
                        onClick={() => {
                            if (qty > 1) setQty(qty - 1);
                        }}
                        type="button"
                        className="px-2"
                    >
                        <FaMinus className="hover:text-yellow-400" />
                    </button>
                </div>
            </div>
            <div className="text-right text-yellow-400 text-lg">
                小計 NT${' '}
                <span>{skuInfo ? skuInfo.price * qty : '暫無資料'}</span>
            </div>
        </>
    );
}

export default SkuInfo;
