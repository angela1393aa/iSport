import React from 'react';
import { useAuth } from '../../../context/auth';
import { API_URL } from '../../utils/config';
import axios from 'axios';
import { useState } from 'react';

function CustomerService(props) {
    const { member } = useAuth('');
    const [category, setCategory] = useState('');
    const [memo, setMemo] = useState('');
    const account = member.account;
    const email = member.email;

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post(
                `${API_URL}/users/CS`,
                {
                    account,
                    email,
                    category,
                    memo,
                },
                { withCredentials: true }
            );
            alert('我們已收到您的建議');
        } catch (e) {
            console.error(e.response);
            alert(e.response.message);
        }
    };
    return (
        <div className="w-screen h-screen fixed top-8 xl:left-0 z-50">
            <form
                onSubmit={handlesubmit}
                className="w-full max-w-screen-sm rounded justify-center items-center transform -translate-y-1/2
                    -translate-x-1/2 z-20 absolute top-1/2 left-1/2 overflow-y-auto"
            >
                <div className="bg-gray-700 pl-5 py-5 text-white text-opacity-85 text-2xl rounded-t-xl font-bold top-0 left-0">
                    聯絡我們
                </div>
                <div className="bg-gray-500 py-5 px-3 text-white text-opacity-85 text-base  font-bold ">
                    <label
                        className="block text-white text-base font-bold mb-2 mt-5"
                        htmlFor="account"
                    >
                        帳號：
                    </label>
                    <input
                        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        id="account"
                        type="text"
                        name="account"
                        value={account}
                    />
                    <hr className="border-1 border-yellow-400 mb-10" />
                    <label
                        className="block text-white text-base font-bold mb-2"
                        for="email"
                    >
                        註冊信箱：
                    </label>
                    <input
                        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                    />
                    <hr className="border-1 border-yellow-400 mb-5" />
                    <label htmlFor="type">種類：</label>
                    <div
                        className="xs:ml-12 xs:justify-between flex text-base mb-5"
                        id="category"
                        name="category"
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                        required
                    >
                        <div>
                            <input
                                type="radio"
                                className=""
                                name="type"
                                value="equity"
                            />
                            會員權益
                        </div>
                        <div>
                            <input
                                type="radio"
                                className=""
                                name="type"
                                value="order"
                            />
                            訂單相關
                        </div>
                        <div>
                            <input
                                type="radio"
                                className=""
                                name="type"
                                value="video"
                            />
                            影片相關
                        </div>
                        <div>
                            <input
                                type="radio"
                                className=""
                                name="type"
                                value="articles"
                            />
                            文章相關
                        </div>
                        <div>
                            <input
                                type="radio"
                                className=""
                                name="type"
                                value="others"
                            />
                            其他
                        </div>
                    </div>
                    <label htmlFor="memo" className="block mb-5">
                        意見：
                    </label>
                    <div className="flex justify-center">
                        <textarea
                            className="block bg-transparent  border border-yellow-400 mb-5 focus:outline-none xs:max-h-full max-h-32"
                            name="memo"
                            placeholder="請輸入您的內容"
                            cols="70"
                            rows="10"
                            onChange={(e) => {
                                setMemo(e.target.value);
                            }}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center ">
                        <button
                            className="btn-green mr-5"
                            onClick={props.onCancel}
                        >
                            返回
                        </button>
                        <button className="btn-yellow">送出</button>
                    </div>
                </div>
            </form>
            <div
                className="bg-black bg-opacity-50 w-screen h-screen fixed z-10"
                onClick={props.onCancel}
            ></div>
        </div>
    );
}
export default CustomerService;
