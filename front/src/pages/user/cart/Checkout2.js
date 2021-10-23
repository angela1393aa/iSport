import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../utils/config';
import { useAuth } from '../../../context/auth';
import { Link, useHistory } from 'react-router-dom';
import UserAside from '../components/UserAside';
import ProgressBar from './components/ProgressBar';
import CreditCard from './components/CreditCard';
import NotAuth from '../components/NotAuth';
import axios from 'axios';

function Checkout2(props) {
    const { member, setMember } = useAuth();
    const { cartAdd, setMyCartP, setTotalAmountP } = props;

    const checkout = async () => {
        let cartItems = JSON.parse(localStorage.getItem('cart')); // []
        let recipient = JSON.parse(localStorage.getItem('recipientData')); // {}
        let result = await axios.post(
            `${API_URL}/order/createOrder`,
            { cartItems, recipient },
            { withCredentials: true }
        );
        setMyCartP(result.data.myCart);
        setTotalAmountP(result.data.totalAmount);
    };

    useEffect(() => {
        cartAdd();
    }, []);
    return (
        <>
            {member ? (
                <main className="sm:max-w-screen-xl w-full mx-auto px-2.5 py-5 flex justify-start border-red-300">
                    <UserAside />
                    <article className="flex-grow flex-col">
                        <div className="bg-gray-700 pl-5 py-5 text-white text-opacity-85 user-page-title rounded-t-xl">
                            購物車
                        </div>
                        <div className="text-white sm:px-12 px-4 py-6 bg-gray-900 rounded-b-xl">
                            <div>
                                <ProgressBar />
                            </div>
                            <div className="flex justify-center mb-8">
                                <h3 className="sm:text-xl text-lg text-white text-opacity-85 py-2 border-b-2 border-yellow-400">
                                    信用卡付款
                                </h3>
                            </div>
                            <div className="sm:flex hidden justify-center mb-8">
                                <div>
                                    <CreditCard checkout={checkout} />
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

export default Checkout2;
