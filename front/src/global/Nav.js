import Logo from '../images/biceps.svg';
import SignIn from '../pages/user/sign/SignIn';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import MobileAside from './MobileAside';
import { useAuth } from '../context/auth';
import axios from 'axios';
import {
    API_URL,
    IMAGE_URL,
    REACT_APP_CLOUDINARY,
    REACT_APP_CLOUDINARY_USER,
} from '../utils/config';
import SignSecress from '../pages/user/components/SignSecress';
import { fromJSON } from 'postcss';

function Nav(props) {
    const { cartCount, signInWindow, setSignInWindow } = props;
    const { member, setMember } = useAuth();

    const [signInSuccess, setSignInSuccess] = useState(false);
    const [openNav, setOpenNav] = useState(false);

    const handleSignIn = () => {
        setSignInWindow(true);
    };

    const handleCancel = () => {
        setSignInWindow(false);
        setSignInSuccess(true);
    };

    //控制手機側欄
    const [MobileWindow, setMobileWindow] = useState(false);
    const handleMobileWindow = () => {
        setMobileWindow(true);
    };

    const handleCancelMobileWindow = () => {
        setMobileWindow(false);
    };
    //登出
    const signout = async () => {
        await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
        setMember(null);
        alert('登出成功');
    };
    return (
        <>
            {/* {signInSuccess && <SignSecress />} */}
            {signInWindow && <SignIn onCancel={handleCancel} />}
            <nav className="App sticky top-0 z-30">
                <div className="bg-gray-900 px-4 py-1.5 flex justify-between items-center">
                    <Link
                        to="/"
                        className="sm:text-3xl text-2xl text-white text-opacity-70 sm:mx-4 mx-2 flex items-center"
                    >
                        <img
                            src={Logo}
                            width="40"
                            alt="Logo"
                            className="my-1 mr-3"
                        />
                        iSport!
                    </Link>

                    <div className="flex items-center">
                        {member ? (
                            <>
                                <div
                                    className="lg:hidden w-12 h-12 rounded-full bg-white overflow-hidden mr-2 cursor-pointer"
                                    onClick={handleMobileWindow}
                                >
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
                                {MobileWindow && (
                                    <MobileAside
                                        onCancel={handleCancelMobileWindow}
                                    />
                                )}
                                <div className="hidden lg:flex items-center justify-between mx-4">
                                    <div
                                        className="text-white cursor-pointer"
                                        onClick={() => setOpenNav(!openNav)}
                                    >
                                        <div className="text-yellow-400">
                                            歡迎回來!
                                        </div>
                                        <div className="flex">
                                            <p className="mr-1">
                                                {member.name}
                                            </p>
                                            {openNav ? (
                                                <TiArrowSortedUp className="text-white self-center" />
                                            ) : (
                                                <TiArrowSortedDown className="text-white self-center" />
                                            )}
                                        </div>
                                    </div>
                                    {openNav && (
                                        <>
                                            <div className="absolute top-14 z-5">
                                                <ul className="bg-gray-700 py-1 rounded shadow-md">
                                                    <li className="text-white text-lg cursor-pointer hover:bg-gray-900 flex w-full px-5">
                                                        <Link to="/user">
                                                            會員中心
                                                        </Link>
                                                    </li>
                                                    <li className="text-white text-lg cursor-pointer hover:bg-gray-900 w-full px-5 flex">
                                                        <Link
                                                            to="/"
                                                            onClick={signout}
                                                            className="flex items-center"
                                                        >
                                                            登出
                                                            <span className="ml-1">
                                                                <RiLogoutBoxRLine />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                className="z-0 flex fixed w-full h-full top-0 left-0"
                                                onClick={() =>
                                                    setOpenNav(false)
                                                }
                                            ></div>
                                        </>
                                    )}
                                    <div className="navmenu cursor-pointer lg:hidden">
                                        <div className="w-12 h-12 rounded-full bg-white overflow-hidden relative mr-4">
                                            <Image
                                                cloudName={REACT_APP_CLOUDINARY}
                                                publicId={
                                                    member.photo ||
                                                    'iSport_Videos/user_photos/images_mxvtyi.png'
                                                }
                                                secure="true"
                                                className="w-full h-full object-cover object-center"
                                            ></Image>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <button
                                className="text-gray-800 bg-yellow-400 border border-solid border-yellow-400 uppercase text-base sm:px-3.5 px-2.5 py-1 mr-2 rounded-full outline-none ease-linear transition-all duration-150"
                                onClick={handleSignIn}
                            >
                                登入
                            </button>
                        )}
                        <Link to="/video">
                            <p className="hidden lg:block text-white text-opacity-85 mx-4 hover:text-yellow-400">
                                精選影片
                            </p>
                        </Link>
                        <Link to="/products/allProduct">
                            <p className="hidden lg:block text-white text-opacity-85 mx-4 hover:text-yellow-400">
                                多樣商品
                            </p>
                        </Link>
                        <Link to="/articles">
                            <p className="hidden lg:block text-white text-opacity-85 mx-4 hover:text-yellow-400">
                                優質文章
                            </p>
                        </Link>
                        <Link
                            to="/gym"
                            className="hidden lg:block text-white text-opacity-85 mx-4 hover:text-yellow-400"
                        >
                            健身房
                        </Link>
                        <Link
                            to="/user/cart"
                            className="text-white text-opacity-85 sm:mx-4 mx-0 relative"
                        >
                            <p className="hover:text-yellow-400">購物車</p>
                            <div className="absolute -right-3 -top-2 bg-red-600 w-5 h-5 rounded-full text-center text-xs pt-0.5">
                                {cartCount}
                            </div>
                        </Link>
                    </div>
                </div>
                {MobileWindow && (
                    <MobileAside onCancel={handleCancelMobileWindow} />
                )}
            </nav>
            <nav className="lg:hidden fixed bottom-0 z-50 w-full bg-gray-900 flex justify-center items-center text-center">
                <Link className="flex-1" to="/video">
                    <p className="text-white text-opacity-85 hover:text-yellow-400 hover:bg-gray-700 py-4">
                        精選影片
                    </p>
                </Link>
                <Link className="flex-1" to="/products/allProduct">
                    <p className="text-white text-opacity-85 hover:text-yellow-400 hover:bg-gray-700 py-4">
                        多樣商品
                    </p>
                </Link>
                <Link className="flex-1" to="/articles">
                    <p className="text-white text-opacity-85 hover:text-yellow-400 hover:bg-gray-700 py-4">
                        優質文章
                    </p>
                </Link>
                <Link className="flex-1" to="/gym">
                    <p className="text-white text-opacity-85 hover:text-yellow-400 hover:bg-gray-700 py-4">
                        健身房
                    </p>
                </Link>
            </nav>
        </>
    );
}

export default Nav;
