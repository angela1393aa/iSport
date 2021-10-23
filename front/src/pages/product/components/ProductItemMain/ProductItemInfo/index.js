import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../context/auth';
import { withRouter } from 'react-router-dom';

import ProductType from './ProductType';
import SkuInfo from './SkuInfo';

import { FaPlus, FaMinus, FaAngleLeft, FaHeart, FaShare } from 'react-icons/fa';

function ProductItemInfo(props) {
    const { productInfo, typeValue, skuDetail, cartAdd } = props;
    const { member, setMember } = useAuth();
    const [currentSku, setCurrentSku] = useState({});
    const [skuInfo, setSkuInfo] = useState(null);
    const [qty, setQty] = useState(1);
    const [info, setInfo] = useState({
        category: '',
        categoryId: 0,
        brand: '',
        productName: '',
        productId: '',
        intro: '',
        totalSale: '',
    });

    // console.log(localStorage);

    const isMember = () => {
        member ? console.log('member is true') : console.log('member is false');
        if (!member) {
            alert('請先登入');
            return;
        }
    };

    function updateCartToLocalStorage(value) {
        // 從localstorage得到cart(json字串)
        const currentCart = localStorage.getItem('cart') || '[]';

        // 把得到的cart(json字串)轉為陣列值，然後和新加入的物件值合併為新陣列
        // const newCart = [...JSON.parse(currentCart), value];

        const newCart = [...JSON.parse(currentCart)];

        let arr = newCart.find((item) => {
            return item.id === value.id;
        });

        if (arr) {
            newCart.map((item) => {
                if (item.id === value.id) {
                    item.qty = value.qty;
                }
            });
        } else {
            newCart.push(value);
        }

        // console.log('newCart', newCart);

        // 設定回localstorage中(記得轉回json字串)
        localStorage.setItem('cart', JSON.stringify(newCart));

        // console.log(newCart);
        // 設定至元件的狀態中
        // setMycart(newCart);
    }

    //nav router change
    const backToCategory = () => {
        // console.log(props);
        let currentCategory = info.categoryId;
        switch (currentCategory) {
            case 1:
                props.history.push('/products/clothe');
                break;
            case 2:
                props.history.push('/products/shoes');
                break;
            case 3:
                props.history.push('/products/equipment');
                break;
            case 4:
                props.history.push('/products/food');
                break;
            default:
                console.log('error');
        }
        // console.log('productInfo_categoryId:', info.categoryId);
    };

    useEffect(() => {
        if (productInfo) {
            setInfo({
                category: productInfo.product_category_name,
                categoryId: productInfo.product_category_id,
                brand: productInfo.brand_name,
                productName: productInfo.product_name,
                productId: productInfo.product_id,
                intro: productInfo.product_intro,
                totalSale: productInfo.total_sale,
            });
        }
    }, [productInfo]);

    useEffect(() => {
        if (typeValue) {
            let obj = {};
            typeValue.forEach((item) => {
                obj[item.type_name_back] = item.typeValue[0].id;
            });
            setCurrentSku(obj);
        }
    }, [typeValue]);

    useEffect(() => {
        // console.log(currentSku);
        let arr = [];
        let string = '';
        arr = Object.values(currentSku);
        string = arr.join();
        if (skuDetail) {
            let aaaaa = skuDetail.filter((item) => {
                return item.sku_group === string;
            });
            setSkuInfo(aaaaa[0]);
        }
        // console.log(skuInfo);
    }, [currentSku, skuDetail]);

    return (
        <>
            <div className="sm:w-1/2 py-5 flex-grow flex flex-col">
                {/* 連結 */}
                <div className=" mb-0 lg:mb-7  text-xs lg:text-sm flex justify-start ">
                    <div
                        onClick={backToCategory}
                        className="flex items-center cursor-pointer"
                    >
                        <FaAngleLeft className="text-yellow-400" />
                        <span>回 &nbsp; </span>
                        <span className="text-yellow-400">{info.category}</span>
                    </div>
                    {/* <div className="flex items-center cursor-pointer">
                        <FaShare className="text-yellow-400" />
                        &nbsp;
                        <p>分享</p>
                    </div> */}
                </div>
                <div className="mb-2 lg:mb-8 ">
                    <h1 className="py-1 lg:py-3 font-bold text-xl sm:text-2xl xl:text-2xl">
                        {info.productName}
                    </h1>
                    <div className="text-xs lg:text-sm">
                        品牌：
                        <span className="text-yellow-400 cursor-pointer">
                            {info.brand}
                        </span>
                        ｜ 總銷售量：
                        <span>{info.totalSale}</span>
                    </div>
                </div>
                <div className="flex-grow">
                    <h2 className="py-2 text-lg lg:text-xl font-bold">規格</h2>
                    {typeValue &&
                        typeValue.map((item) => {
                            return (
                                <ProductType
                                    key={item.id}
                                    typeName={item.type_name}
                                    typeNameBack={item.type_name_back}
                                    typeValue={item.typeValue}
                                    currentSku={currentSku}
                                    setCurrentSku={setCurrentSku}
                                />
                            );
                        })}
                    <SkuInfo skuInfo={skuInfo} qty={qty} setQty={setQty} />
                </div>
                <div className="flex">
                    <button
                        onClick={() => {
                            if (!member) {
                                alert('請先登入');
                                return;
                            }
                            updateCartToLocalStorage({
                                id: skuInfo.sku_id,
                                product_id: info.productId,
                                sku_code: skuInfo.sku_code,
                                qty: qty,
                            });
                            alert('成功加入購物車！！');
                            cartAdd();
                        }}
                        className="btn-yellow mr-3 w-full  "
                    >
                        加入購物車
                    </button>
                    {/* <button className="border border-red-300 rounded-full text-red-300 flex-grow flex justify-center items-center">
                        <FaHeart />
                        <p className="pl-2">收藏</p>
                    </button> */}
                </div>
            </div>
        </>
    );
}

export default withRouter(ProductItemInfo);
