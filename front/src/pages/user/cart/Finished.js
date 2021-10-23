import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import { API_URL } from '../../../utils/config';
import ProgressBar from './components/ProgressBar';
import CheckItem from './components/CheckItem';
import NotAuth from '../components/NotAuth';
import UserAside from '../components/UserAside';
import axios from 'axios';

function Finished(props) {
    const { member, setMember } = useAuth();
    const { cartAdd, myCartP } = props;
    const [orderInfo, setOrderInfo] = useState({
        order_no: '2110ORD0783',
        recipient: '阿寶',
        phone: '0955123456',
        email: 'bo@gmail.com',
        address: '桃園市平鎮區212號',
        order_date: '2021/10/05',
        paytype: '線上刷卡',
        delivery: '郵寄',
        order_status: '4',
        total_amount: 1000,
    });

    // GET DATA FROM DB
    const getOrderDataFromDB = async () => {
        const result = await axios.post(
            `${API_URL}/order`,
            {},
            { withCredentials: true }
        );
        setOrderInfo(result.data.orders[0]);
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('cart');
    };

    let orderStatusMap = {
        1: '待出貨',
        2: '已出貨',
        3: '取消訂單',
        4: '確認訂單',
    };

    useEffect(() => {
        getOrderDataFromDB();
        clearLocalStorage();
        cartAdd();
    }, [member]);

    return (
        <>
            {member ? (
                <main className="sm:max-w-screen-xl w-full mx-auto px-2.5 py-5 flex justify-start border-red-300">
                    <UserAside />
                    <article className="flex-grow flex-col">
                        <div className="bg-gray-700 p-5 text-white text-opacity-85 rounded-t-xl flex justify-between">
                            <div className="user-page-title">購物車</div>
                            <div className="user-page-sub-title text-yellow-400 cursor-pointer">
                                <Link to="/user/order">我的訂單</Link>
                            </div>
                        </div>
                        <div className="text-white sm:px-12 px-4 py-6 bg-gray-900 rounded-b-xl">
                            <div>
                                <ProgressBar />
                            </div>
                            <div className="flex justify-center sm:mb-8 my-4">
                                <h3 className="sm:text-2xl text-xl font-bold text-yellow-400 py-2">
                                    訂單已成立，謝謝您的購買!
                                </h3>
                            </div>
                            <div className="border-b-2 border-yellow-400 mb-8">
                                <h5 className="pb-2.5 sm:text-xl text-lg text-center">
                                    訂單編號 : {orderInfo.order_no}
                                </h5>
                            </div>
                            <div className="flex sm:flex-row flex-col mb-8">
                                <div className="flex-1">
                                    <table>
                                        <tr className="">
                                            <td className="w-20 pb-4">
                                                收件人 :{' '}
                                            </td>
                                            <td className="pb-4">
                                                {orderInfo.recipient}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-4">
                                                聯絡電話 :{' '}
                                            </td>
                                            <td className="pb-4">
                                                {orderInfo.phone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-4">
                                                電子信箱 :{' '}
                                            </td>
                                            <td className="pb-4">
                                                {orderInfo.email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-4">
                                                收件地址 :{' '}
                                            </td>
                                            <td className="pb-4">
                                                {orderInfo.address}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="flex-1 sm:ml-5">
                                    <table>
                                        <tr>
                                            <td className="w-20 pb-4">
                                                下單日期 :
                                            </td>
                                            <td className="pb-4">
                                                {orderInfo.order_date &&
                                                    orderInfo.order_date.slice(
                                                        0,
                                                        10
                                                    )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-4">
                                                付款方式 :{' '}
                                            </td>
                                            <td className="pb-4">
                                                {orderInfo.paytype}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-4">
                                                運送方式 :{' '}
                                            </td>
                                            <td className="pb-4">
                                                {orderInfo.delivery}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-4">
                                                訂單狀態 :{' '}
                                            </td>
                                            <td className="pb-4">
                                                {
                                                    orderStatusMap[
                                                        orderInfo.order_status
                                                    ]
                                                }
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <div className="border-b-2 border-yellow-400 mb-8">
                                <h5 className="pb-2.5 text-xl text-center">
                                    訂購明細
                                </h5>
                            </div>
                            <CheckItem myCart={orderInfo.detail} />
                            <div className="pt-2.5 mt-2.5 mb-6 border-t-2 border-yellow-400 text-yellow-400 flex flex-col">
                                <div className="flex flex-row-reverse">
                                    <span className="w-14 text-right text-lg font-bold">
                                        {orderInfo.delivery_fee}
                                    </span>
                                    <p className="text-lg font-bold flex-grow text-right mr-4">
                                        運費
                                    </p>
                                </div>
                                <div className="flex flex-row-reverse">
                                    <span className="w-14 text-right text-lg font-bold">
                                        {orderInfo.total_amount.toLocaleString()}
                                    </span>
                                    <p className="text-lg font-bold flex-grow text-right mr-4">
                                        Total : $
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
            ) : (
                <NotAuth />
            )}
        </>
    );
}

export default Finished;
