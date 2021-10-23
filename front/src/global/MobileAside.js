import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import CustomerService from '../pages/user/sign/CustomerService';
import userHeader from '../images/user/pic04.jpg';
import { API_URL, IMAGE_URL } from '../utils/config';
import axios from 'axios';
import {
    REACT_APP_CLOUDINARY,
    REACT_APP_CLOUDINARY_USER,
} from '../utils/config';

import {
    FaUserAlt,
    FaShoppingCart,
    FaHeart,
    FaMoneyCheck,
    FaComment,
    FaTimes,
    FaSignOutAlt,
} from 'react-icons/fa';

function MobileAside(props) {
    const { member, setMember } = useAuth();

    //控制cs跳窗
    const [CustomerServiceWindow, setCustomerServiceWindow] = useState(false);
    const handleCustomerService = () => {
        setCustomerServiceWindow(true);
    };

    const handleCancel = () => {
        setCustomerServiceWindow(false);
    };
    const signout = async () => {
        await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
        setMember(null);
        alert('登出成功');
    };
    return (
        <>
            {member && (
                <>
                    <aside className="lg:hidden mr-2.5 bg-gray-900 shadow-xl absolute top-0 left-0 z-50 h-screen">
                        {CustomerServiceWindow && (
                            <CustomerService onCancel={handleCancel} />
                        )}
                        <div className="flex justify-center items-center p-2.5 bg-gray-800">
                            <div className="w-12 h-12 rounded-full bg-white overflow-hidden">
                                <Image
                                    cloudName={REACT_APP_CLOUDINARY_USER}
                                    publicId={
                                        member.photo ||
                                        'iSport_Videos/user_photos/images_mxvtyi.png'
                                    }
                                    secure="true"
                                    className="w-full h-full object-cover object-center"
                                ></Image>
                            </div>
                            <p className="text-white text-opacity-85 ml-2.5">
                                Hi <>{member.name}</>，歡迎回來！
                            </p>
                            <div className="w-10 h-10 p-2 rounded-full bg-gray-900 text-center items-center">
                                <FaTimes
                                    className="w-6 h-6 text-white cursor-pointer"
                                    onClick={props.onCancel}
                                />
                            </div>
                        </div>
                        <div className="h-full aside-menu">
                            <ul className="text-white text-lg ">
                                <Link to="/user" className="w-full">
                                    <li className="users-li">
                                        <FaUserAlt className="userIcons" />
                                        會員資料
                                    </li>
                                </Link>
                                <li className="users-li">
                                    <FaShoppingCart className="userIcons" />
                                    訂單管理
                                    <ul className="submenu">
                                        <li className="user-submenu-li">
                                            <Link
                                                to="/user/cart/TradingRecord"
                                                className="w-full block"
                                            >
                                                購買紀錄
                                            </Link>
                                        </li>
                                        <li className="user-submenu-li">
                                            <Link
                                                to="/user/cart"
                                                className="w-full block"
                                            >
                                                購物車
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="users-li">
                                    <FaHeart className="userIcons" />
                                    影片收藏
                                    <ul className="submenu">
                                        <li className="user-submenu-li">
                                            <Link
                                                to="/user/videoCollection"
                                                className="w-full block"
                                            >
                                                收藏影片
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="users-li">
                                    <FaMoneyCheck className="userIcons" />
                                    文章管理
                                    <ul className="submenu">
                                        <li className="user-submenu-li">
                                            <Link
                                                to="/user/ArticleMyart"
                                                className="w-full block"
                                            >
                                                我的文章
                                            </Link>
                                        </li>
                                        <li className="user-submenu-li">
                                            <Link
                                                to="/user/ArticleAdd"
                                                className="w-full block"
                                            >
                                                新增文章
                                            </Link>
                                        </li>
                                        <li className="user-submenu-li">
                                            <Link
                                                to="/user/ArticleCollect"
                                                className="w-full block"
                                            >
                                                收藏文章
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    onClick={handleCustomerService}
                                    className="users-li cursor-pointer"
                                >
                                    <FaComment className="userIcons" />
                                    聯絡我們
                                </li>
                                <li className="users-li cursor-pointer border-t-2 border-yellow-400">
                                    <Link to="/" onClick={signout}>
                                        <FaSignOutAlt className="userIcons" />
                                        登出帳號
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <div
                        className="lg:hidden bg-black bg-opacity-10 z-40 top-0 left-0 w-screen h-screen fixed"
                        onClick={props.onCancel}
                    ></div>
                </>
            )}
        </>
    );
}
export default MobileAside;
