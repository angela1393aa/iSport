import React from 'react';
import { Link } from 'react-router-dom';

function SearchPassword() {
    return (
        <div className="w-screen">
            <form className=" max-w-sm rounded justify-center items-center block">
                <div className=" w-screen justify-center items-center flex">
                    <div className="max-w-xl w-full m-10 ">
                        <div className="bg-gray-900 pl-5 py-5 text-white text-opacity-85 text-2xl  font-bold rounded-t-xl">
                            忘記密碼
                        </div>
                        <div className="bg-gray-700 py-5 px-3 text-white text-opacity-85 text-base  font-bold rounded-b-xl">
                            <label
                                className="block text-white text-base font-bold mb-2 mt-5"
                                htmlFor="account"
                            >
                                請輸入帳號：
                            </label>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                id="account"
                                type="text"
                                disabled
                            />
                            <hr className="border-2 border-yellow-400 mb-10" />
                            <label
                                className="block text-white text-base font-bold mb-2"
                                htmlFor="email"
                            >
                                請輸入註冊信箱：
                            </label>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                id="email"
                                type="email"
                                disabled
                            />
                            <hr className="border-2 border-yellow-400 mb-5" />
                            <div className="flex justify-center ">
                                <Link to="/">
                                    <button className="btn-green mr-5">
                                        返回
                                    </button>
                                </Link>
                                <button className="btn-yellow">送出</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default SearchPassword;
