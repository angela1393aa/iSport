import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../utils/config';
import axios from 'axios';
import { withRouter, useParams } from 'react-router-dom';

import ProductPhoto from './ProductPhoto/';
import ProductItemInfo from './ProductItemInfo/';

import product from '../../../../images/product/1002-3.png';

import {
    FaPlus,
    FaMinus,
    FaAngleLeft,
    FaAngleRight,
    FaHeart,
    FaCaretDown,
    FaShare,
} from 'react-icons/fa';

function ProductItemMain(props) {
    const { cartAdd } = props;
    const { productId } = useParams();
    const [error, setError] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [skuDetail, setSkuDetail] = useState(null);
    const [typeValue, setTypeValue] = useState(null);
    const [productImg, setProductImg] = useState(null);
    const [data, setData] = useState([]);
    useEffect(() => {
        const getOneProductList = async () => {
            try {
                let response = await axios.get(
                    `${API_URL}/products/item/${productId}`
                );
                // console.log(response);
                let oData = response.data;
                setData(oData);
                setProductInfo(response.data.product[0]);
                setSkuDetail(response.data.skuDetail);
                setTypeValue(response.data.typeValue);
                setProductImg(response.data.productImg);
            } catch (e) {
                setError(e.message);
            }
        };
        getOneProductList();
    }, [productId]);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    return (
        <>
            <main className="px-3 sm:px-6 text-white text-opacity-85 max-w-screen-xl my-0 mx-auto">
                {/* 圖片與資訊 */}
                <section className="w-full py-3 flex flex-col sm:flex-row">
                    {/* 圖片 */}
                    <ProductPhoto productImg={productImg} />
                    {/* 資訊與加入購物車 */}
                    <ProductItemInfo
                        key={productId}
                        productInfo={productInfo}
                        typeValue={typeValue}
                        skuDetail={skuDetail}
                        cartAdd={cartAdd}
                    />
                </section>
                {/* 商品簡介 */}
                <section className=" min-h-80 mt-5 overflow-y-hidden relative">
                    <h1 className="py-3 text-xl border-b-2 border-yellow-400 ">
                        商品介紹
                    </h1>
                    <div className="  py-3 break-all leading-relaxed">
                        {productInfo && productInfo.product_intro !== ''
                            ? productInfo.product_intro
                            : '無相關簡介'}
                    </div>
                </section>
                {/* 你可能會喜歡 */}
                <section className="hidden my-5">
                    <h1 className="py-3 text-xl border-b-2 border-yellow-400 ">
                        你可能會喜歡......
                    </h1>
                    <div className="w-full overflow-x-hidden relative">
                        <div className="h-full w-10 bg-gradient-to-r from-gray-800 absolute top-0 left-0 z-10 flex items-center justify-center">
                            <FaAngleLeft className="text-3xl text-white " />
                        </div>
                        <div className="h-full w-10 bg-gradient-to-l from-gray-800 absolute top-0 right-0 z-10 flex items-center justify-center">
                            <FaAngleRight className="text-3xl text-white " />
                        </div>

                        <div className="py-5 flex mx-0 lg:mx-2">
                            <div className="mr-1 lg:mr-4 flex-shrink-0 w-40 lg:w-60 rounded overflow-hidden shadow-lg bg-gray-900 relative">
                                <img
                                    className="w-full"
                                    src={product}
                                    alt="Mountain"
                                />
                                <div className="px-4 py-2  lg:px-6 lg:py-4 h-32 lg:h-40 flex flex-col justify-between">
                                    <div className="text-base lg:text-lg mb-2 text-yellow-400">
                                        15 分鐘高强度全身肌肉
                                        無需器材又能在家做的運動
                                    </div>
                                    <div className="text-sm lg:text-base text-white flex justify-between">
                                        <div>$350</div>
                                        <div>
                                            已出售 <span>100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ProductItemMain;
