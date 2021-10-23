import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import CustomerService from '../pages/user/sign/CustomerService';

function Footer() {
    const [CustomerServiceWindow, setCustomerServiceWindow] = useState(false);
    const handleCustomerService = () => {
        setCustomerServiceWindow(true);
    };

    const handleCancel = () => {
        setCustomerServiceWindow(false);
    };
    return (
        <>
            {CustomerServiceWindow && (
                <CustomerService onCancel={handleCancel} />
            )}
            <footer className="footer-1 bg-gray-900 py-14">
                <div className="flex justify-center text-gray-900 mb-3.5">
                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 border border-2 border-gray-400 rounded-full text-center py-1 mx-1 bg-white
                            bg-opacity-85 hover:bg-yellow-400 text-2xl flex justify-center items-center"
                    >
                        <FiInstagram />
                    </a>
                    <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 border border-2 border-gray-400 rounded-full text-center py-1 mx-1 bg-white
                            bg-opacity-85 hover:bg-yellow-400 text-2xl flex justify-center items-center"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://www.twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 border border-2 border-gray-400 rounded-full text-center py-1 mx-1 bg-white
                            bg-opacity-85 hover:bg-yellow-400 text-2xl flex justify-center items-center"
                    >
                        <FaTwitter />
                    </a>
                </div>
                <div className="flex justify-center text-white text-opacity-85 mb-3.5">
                    <div className="hover:text-yellow-400 cursor-pointer">
                        <Link to="/articles">文章</Link>
                    </div>
                    <div className="px-3">·</div>
                    <div className="hover:text-yellow-400 cursor-pointer">
                        <Link to="/products/allProduct">商品</Link>
                    </div>
                    <div className="px-3">·</div>
                    <div className="hover:text-yellow-400 cursor-pointer">
                        <Link to="/video">影片</Link>
                    </div>
                </div>
                <div className="flex justify-center text-white text-opacity-85 mb-3.5">
                    <div
                        className="hover:text-yellow-400 cursor-pointer"
                        onClick={handleCustomerService}
                    >
                        <Link to="/">聯絡我們</Link>
                    </div>
                    {/* <div className="px-3">·</div> */}
                    {/* <div className="hover:text-yellow-400 cursor-pointer">
                        <Link to="/">關於我們</Link>
                    </div> */}
                </div>
                <div className="flex justify-center text-white text-opacity-85 mb-5">
                    <p>Copyright © ISport! All rights reserved.</p>
                </div>
                <div className="flex justify-center text-center text-xs text-gray-500 text-opacity-85">
                    <p>
                        本網站為中壢資策會前端設計工程師班MFEE17第四組學員專題成果作品，本平台僅供學習、展示之用。
                        <br />
                        若有侵權疑慮，您可以私訊臉書 -
                        【中壢】前端工程師就業養成班(MFEE17)，後續會由專人協助處理。
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
