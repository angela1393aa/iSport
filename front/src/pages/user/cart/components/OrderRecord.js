import React, { useState, useRef } from 'react';
import OrderDetail from './OrderDetail/OrderDetail.js';

function OrderRecord(props) {
    const {
        img,
        order_no,
        order_date,
        price,
        paytype,
        delivery,
        status,
        total_amount,
        detail,
    } = props;

    const showItemRef = useRef();
    const showOrderDetail = () => {
        const showItem = showItemRef.current;
        showItem.classList.toggle('hidden');
    };

    let orderStatusMap = {
        1: '待出貨',
        2: '已出貨',
        3: '取消訂單',
        4: '確認訂單',
    };

    return (
        <>
            <div className="mb-8 p-4 rounded-lg bg-gray-700 border-r-8 border-yellow-400 flex flex-col">
                <div className="flex sm:flex-row flex-col">
                    <figure className="mr-4 sm:w-14 sm:h-14 w-1/3 overflow-hidden rounded-lg self-center">
                        <img
                            src={
                                require('../../../../images/product/' + img)
                                    .default
                            }
                            alt=""
                            className="w-full h-full object-cover object-center"
                        />
                    </figure>
                    <div className="text-sm py-2 flex-grow grid sm:grid-flow-col sm:grid-cols-3 sm:grid-rows-2 gap-y-px justify-center">
                        <p>
                            訂單編號：<span>{order_no}</span>
                        </p>
                        <p>
                            購買時間：
                            <span>{order_date}</span>
                        </p>
                        <p>
                            訂單總額：<span>{total_amount}</span>
                        </p>
                        <p>
                            付款方式：<span>{paytype}</span>
                        </p>
                        <p>
                            運送方式：<span>{delivery}</span>
                        </p>
                        <p>
                            訂單狀態：
                            <span>{orderStatusMap[status]}</span>
                        </p>
                    </div>
                    <div className="text-sm text-yellow-400 flex-shrink-0 flex justify-center">
                        <p
                            className="self-center cursor-pointer"
                            onClick={() => {
                                showOrderDetail();
                            }}
                        >
                            詳細資訊
                        </p>
                    </div>
                </div>
                <div
                    ref={showItemRef}
                    className="mt-2 p-4 bg-gray-700 border-t-2 border-yellow-400 hidden"
                >
                    {detail &&
                        detail.map((item) => (
                            <OrderDetail
                                key={item.id}
                                img={item.img.img_name}
                                name={item.product_name}
                                qty={item.qty}
                                price={item.price}
                                type={item.type}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}

export default OrderRecord;
