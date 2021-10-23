import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../utils/config';
import { FaHeart, FaTrashAlt } from 'react-icons/fa';
import { TiPlus, TiMinus } from 'react-icons/ti';
import axios from 'axios';

function CartItem(props) {
    const [error, setError] = useState(null);
    const [myCart, setMyCart] = useState([]);
    const [myCartDisplay, setMyCartDisplay] = useState([]);
    const { setTotalAmount, cartAdd, checkLocalStorage } = props;
    let totalAmount = 0;

    // 取得 localStorage 中 cart 資料
    const getCartFromLocalStorage = async () => {
        // 取得 localStorage 中 cart 資料，如果 localStorage 中沒有 cart 時，存一個空的 []。
        const cartLocalStorage = localStorage.getItem('cart') || '[]';
        const cartItems = JSON.parse(cartLocalStorage);

        setMyCart(cartItems);
    };

    // GET DATA FROM DB
    const getDataFromDB = async (cartItems) => {
        let result = await axios.post(
            `${API_URL}/cart`,
            {
                cartItems,
            },
            { withCredentials: true }
        );

        // 前端計算總金額，傳回父母元件
        result.data.myCart.forEach((item) => {
            const amount = item.price * item.qty;
            totalAmount += amount;
        });
        // alert(totalAmount);

        setMyCartDisplay(result.data.myCart);
        setTotalAmount(totalAmount);
    };

    // 更新購物車中的商品數量
    const updateCartTolocalStorage = async (item, isAdded = true) => {
        // console.log('item, isAdded', item, isAdded);
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

        // 尋找localStorage 中有沒有此cart[i].id
        const index = currentCart.findIndex((v) => v.id === item.sku_id);
        // console.log('index', index);

        if (index > -1) {
            isAdded ? currentCart[index].qty++ : currentCart[index].qty--;
        }
        localStorage.setItem('cart', JSON.stringify(currentCart));

        // 設定回購物車
        setMyCart(currentCart);
    };

    // 移除購物車中的商品
    const removeFromCart = (item) => {
        // 取出 localStorage 裡的 cart 字串並 parse 回「陣列」
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        // 找到 currentCart 裡的 item 並刪除它
        const index = currentCart.findIndex((v) => v.id === item.sku_id);
        currentCart.splice(index, 1);
        // 把新的陣列轉成「字串」存回 localStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));

        // 設定回購物車
        setMyCart(currentCart);
    };

    // componentDidMount 一進到此頁面，從 localStorage 得到 cart 資料
    useEffect(() => {
        getCartFromLocalStorage();
    }, []);

    // componentDidUpdate 每次 myCart 資料更新
    useEffect(() => {
        let newMyCartDisplay = [];

        // 尋找 myCartDisplay
        for (let i = 0; i < myCart.length; i++) {
            // 尋找 myCartDisplay 中有沒有此myCart[i].id
            // 找到   --> 返回該陣列的索引值
            // 沒找到 --> 返回-1
            const index = newMyCartDisplay.findIndex(
                (value) => value.id === myCart[i].id
            );

            if (index !== -1) {
                // 有的話就數量+1
                newMyCartDisplay[index].qty += myCart[i].qty;
            } else {
                // 沒有的話就把項目加入，數量為1
                const newItem = { ...myCart[i] };
                newMyCartDisplay = [...newMyCartDisplay, newItem];
            }
        }
        checkLocalStorage();
        if (newMyCartDisplay.length > 0) {
            getDataFromDB(newMyCartDisplay);
        }
        cartAdd();
    }, [myCart]);

    return (
        <>
            {myCartDisplay &&
                myCartDisplay.map((item) => {
                    return (
                        <div
                            className="sm:p-2.5 lg:p-4 p-1.5 flex flex-row"
                            key={item.sku_id}
                        >
                            {/* ========== 商品圖片 ========== */}
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
                            <div className="flex flex-col flex-grow lg:ml-10 ml-5 ">
                                <div className="flex flex-row justify-between pb-2.5 cursor-default">
                                    <h3 className="sm:text-xl text-base font-bold break-words mr-4">
                                        {item.product_name}
                                    </h3>
                                    <p className="text-yellow-400 font-bold">
                                        ${item.amount.toLocaleString()}
                                    </p>
                                </div>
                                <div className="pb-1.5 text-sm text-yellow-400 cursor-default">
                                    {item.brand_name}
                                </div>
                                {/* TYPE */}
                                {item.typeValue.map((value) => {
                                    return (
                                        <div
                                            className="flex flex-row items-center pb-1.5 cursor-default"
                                            key={value.type_id}
                                        >
                                            <p className="sm:mr-2.5 mr-6">
                                                {value.type_name}：
                                            </p>
                                            <div className="btn-yellow-tag px-4">
                                                {value.type_value}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="flex flex-row sm:items-center">
                                    <div className="flex flex-row pb-1.5 sm:pb-0">
                                        <p className="sm:mr-2.5 mr-4 cursor-default">
                                            數量：
                                        </p>

                                        {/* ============= 數量加減鈕 ============= */}
                                        <div className="px-2 sm:mr-2.5 mr-2 border border-yellow-400 rounded-md flex flex-row items-center bg-transparent">
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    if (item.qty === 1) return;
                                                    updateCartTolocalStorage(
                                                        item,
                                                        false
                                                    );
                                                }}
                                            >
                                                <TiMinus />
                                            </div>
                                            <div>
                                                <div className="w-5 text-center">
                                                    {item.qty}
                                                </div>
                                            </div>
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    if (
                                                        item.qty >= item.stock
                                                    ) {
                                                        alert(
                                                            '購買數量已達上限'
                                                        );
                                                        return;
                                                    }
                                                    updateCartTolocalStorage(
                                                        item,
                                                        true
                                                    );
                                                }}
                                            >
                                                <TiPlus />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row pb-1.5 sm:pb-0">
                                        {/* <div className=" cursor-pointer mr-2.5 text-red-400 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white hover:text-opacity-85 active:bg-red-600 font-md uppercase text-sm sm:px-2 px-4 py-1 rounded-full outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center">
                                            <FaHeart className="mx-1 sm:mr-2.5" />
                                            <p className="sm:block hidden">
                                                移至收藏
                                            </p>
                                        </div> */}
                                        <div
                                            className="cursor-pointer btn text-yellow-400 bg-transparent border border-solid border-yellow-300 hover:bg-yellow-400 hover:text-gray-800 active:bg-yellow-600 font-md uppercase text-sm sm:px-2 px-4 py-1 rounded-full outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center"
                                            onClick={() => {
                                                removeFromCart(item);
                                            }}
                                        >
                                            <FaTrashAlt className="mx-1 sm:mr-2.5" />
                                            <p className="sm:block hidden">
                                                移除商品
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}

export default CartItem;
