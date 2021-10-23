import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import userHeader from './images.png';
import {
    FaUserAlt,
    FaShoppingCart,
    FaHeart,
    FaMoneyCheck,
    FaComment,
    FaCamera,
} from 'react-icons/fa';
import { useState, useRef } from 'react';
import CustomerService from '../sign/CustomerService';
import axios from 'axios';
import {
    API_URL,
    REACT_APP_CLOUDINARY,
    REACT_APP_CLOUDINARY_USER,
} from '../../../utils/config';
import { useAuth } from '../../../context/auth';

// 聯絡我們跳窗
// async
function UserAside() {
    const { member, setMember } = useAuth();
    const [CustomerServiceWindow, setCustomerServiceWindow] = useState(false);
    const [photo, setPhoto] = useState();
    const formData = new FormData();
    const userImageForm = useRef();

    const handleCustomerService = () => {
        setCustomerServiceWindow(true);
    };

    const handleCancel = () => {
        setCustomerServiceWindow(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.append('photo', photo);
        let response = await axios.put(
            `${API_URL}/users/photo/${member.account}`,
            formData,
            {
                withCredentials: true,
            }
        );
        setMember(response.data);
        console.log(member);
        try {
            alert('頭像上傳成功');
        } catch (e) {
            //透過e.response拿到axios的response
            console.error(e.response);
            //顯示錯誤訊息到前端，目前先使用alert顯示後面可以修改成套窗或者紅字顯示
            alert(e.response.data.message);
        }
    };

    const handleImage = async (e) => {
        await setPhoto(e.target.files[0]);
        userImageForm.current.requestSubmit();
    };

    return (
        <aside className="lg:block hidden min-w-64 min-h-screen pt-6 mr-2.5 bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            {CustomerServiceWindow && (
                <CustomerService onCancel={handleCancel} />
            )}
            <form
                onSubmit={handleSubmit}
                ref={userImageForm}
                className="flex justify-center mb-4"
            >
                <div className="group w-48 h-48 rounded-full flex justify-center items-center cursor-pointer relative mt-3 mb-3">
                    <input
                        required
                        title="請選擇圖片"
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={(e) => handleImage(e)}
                        className="w-48 h-48 rounded-full overflow z-10 absolute opacity-0 cursor-pointer"
                    />
                    {member.photo ? (
                        <div className="w-48 h-48 rounded-full overflow-hidden z-0 relative">
                            <div className="flex w-full h-full rounded-full group-hover:bg-black group-hover:bg-opacity-50 absolute transition-all duration-300 ease-in-out"></div>
                            <Image
                                cloudName={REACT_APP_CLOUDINARY_USER}
                                publicId={member.photo}
                                secure="true"
                                className="w-full h-full object-cover object-center group-hover:filter group-hover:blur-sm transition-all duration-300 ease-in-out"
                            ></Image>
                        </div>
                    ) : (
                        <div className="w-48 h-48 rounded-full overflow-hidden z-0">
                            <Image
                                cloudName={REACT_APP_CLOUDINARY_USER}
                                publicId="iSport_Videos/user_photos/images_mxvtyi.png"
                                secure="true"
                                className="w-full h-full object-cover object-center group-hover:filter group-hover:blur-sm transition-all duration-300 ease-in-out"
                            ></Image>
                        </div>
                    )}
                    <FaCamera className="w-16 h-16 text-gray-300 text-opacity-0 group-hover:text-opacity-70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                </div>
            </form>
            <div className="h-full aside-menu">
                <ul className="text-white text-lg ">
                    <Link to="/user">
                        <li className="users-li cursor-pointer">
                            <FaUserAlt className="userIcons" />
                            會員資料
                        </li>
                    </Link>
                    <li className="users-li cursor-pointer">
                        <FaShoppingCart className="userIcons" />
                        <label for="ordermenu" className="cursor-pointer">
                            訂單管理
                        </label>
                        <input
                            type="checkbox"
                            id="ordermenu"
                            className="hidden"
                        />
                        <section className="hidden-section">
                            <ul className="submenu">
                                <li className="user-submenu-li cursor-pointer">
                                    <Link to="/user/order">購買紀錄</Link>
                                </li>
                                <li className="user-submenu-li cursor-pointer">
                                    <Link to="/user/cart">購物車</Link>
                                </li>
                            </ul>
                        </section>
                    </li>
                    <li className="users-li cursor-pointer">
                        <FaHeart className="userIcons" />
                        <label for="videomenu" className="cursor-pointer">
                            影片收藏
                        </label>
                        <input
                            type="checkbox"
                            id="videomenu"
                            className="hidden"
                        />
                        <section className="hidden-section">
                            <ul className="submenu">
                                <li className="user-submenu-li cursor-pointer">
                                    <Link to="/user/videoCollection">
                                        收藏影片
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </li>
                    <li className="users-li cursor-pointer">
                        <FaMoneyCheck className="userIcons" />
                        <label for="articlemenu" className="cursor-pointer">
                            文章管理
                        </label>
                        <input
                            id="articlemenu"
                            type="checkbox"
                            className="hidden"
                        />
                        <section className="hidden-section">
                            <ul className="submenu">
                                <li className="user-submenu-li cursor-pointer">
                                    <Link to="/user/ArticleMyart">
                                        我的文章
                                    </Link>
                                </li>
                                <li className="user-submenu-li cursor-pointer">
                                    <Link to="/user/ArticleAdd">新增文章</Link>
                                </li>
                                <li className="user-submenu-li cursor-pointer">
                                    <Link to="/user/ArticleCollect">
                                        收藏文章
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </li>
                    <li
                        onClick={handleCustomerService}
                        className="users-li cursor-pointer"
                    >
                        <FaComment className="userIcons" />
                        聯絡我們
                    </li>
                </ul>
            </div>
        </aside>
    );
}
export default UserAside;
