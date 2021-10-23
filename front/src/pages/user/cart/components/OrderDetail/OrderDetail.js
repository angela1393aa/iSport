import React from 'react';

function OrderDetail(props) {
    const { key, img, name, qty, price, type } = props;

    return (
        <>
            <div className="flex">
                <figure className="mr-4 sm:mr-8 sm:w-10 sm:h-10 w-1/3 overflow-hidden rounded-lg self-center">
                    <img
                        src={
                            require('../../../../../images/product/' + img)
                                .default
                        }
                        alt=""
                        className="w-full h-full object-cover object-center"
                    />
                </figure>
                <div className="text-sm py-2 flex-grow grid sm:grid-flow-row sm:grid-cols-4 sm:grid-rows-2 gap-y-px">
                    <p className="col-span-3">
                        商品名稱：<span>{name}</span>
                    </p>
                    <p>
                        單價：<span>{price}</span>
                    </p>
                    <p>
                        購買數量：
                        <span>{qty}</span>
                    </p>
                    {type &&
                        type.map((item) => (
                            <p key={item.id}>
                                {item.type_name}：<span>{item.type_value}</span>
                            </p>
                        ))}
                </div>
            </div>
        </>
    );
}

export default OrderDetail;
