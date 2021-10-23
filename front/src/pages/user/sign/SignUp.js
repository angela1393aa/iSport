import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { useAuth } from '../../../context/auth';

function SignUp() {
    const { member } = useAuth();

    // 控制密碼顯示隱藏
    const [passwordShown, setPasswordShown] = useState(false);

    const [name, setname] = useState();
    const [account, setaccount] = useState();
    const [password, setpassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [address, setaddress] = useState();
    const [birthday, setbirthday] = useState();
    const [aboutme, setaboutme] = useState();
    const [gender, setgender] = useState('reserve');
    const [message, setMessage] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message == false) {
            try {
                let response = await axios.post(`${API_URL}/auth/SignUp`, {
                    name,
                    account,
                    password,
                    email,
                    phone,
                    address,
                    birthday,
                    aboutme,
                    gender,
                });
                alert('註冊成功');
                console.log(response);
            } catch (e) {
                //透過e.response拿到axios的response
                console.error(e.response);
                //顯示錯誤訊息到前端，目前先使用alert顯示後面可以修改成套窗或者紅字顯示
                console.log(e.response);
            }
        } else {
            alert('請檢查紅色錯誤內容');
        }
    };
    const checkpassword = (e) => {
        setconfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setMessage('密碼不一致');
        } else {
            setMessage(false);
        }
    };

    if (member !== null) {
        return <Redirect to="/user" />;
    }
    return (
        <main className="max-w-screen-xl mx-auto px-2.5 py-5 flex justify-start border-red-300">
            <artical className="flex-grow flex-col">
                <div className="bg-gray-700 pl-5 py-5 text-white text-opacity-85 text-3xl rounded-t-xl font-bold">
                    基本資料
                    <span className="text-base text-red-500	">(必填)</span>
                </div>
                <div className="text-white bg-gray-900 w-full object-cover object-center text-opacity-85 text-lg pl-12 py-5 pr-10">
                    <form onSubmit={handleSubmit}>
                        <br />
                        <div>
                            <label for="name">姓名：</label>
                            <input
                                type="text"
                                className="input-style "
                                id="name"
                                placeholder="請輸入姓名"
                                name="name"
                                onChange={(e) => {
                                    setname(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <br />
                        <div className="lg:items-center lg:py-2  text-white mt-5 mb-5">
                            <label for="account">帳號：</label>
                            <input
                                type="text"
                                className="input-style"
                                placeholder="開頭為字母6~8碼的帳號"
                                oninvalid="開頭為字母6~8碼的帳號"
                                name="account"
                                id="account"
                                minLength="6"
                                maxLength="8"
                                onChange={(e) => {
                                    setaccount(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="lg:flex lg:flex-wrap mr-3 mb-6 lg:justify-between text-white">
                            <div className="lg:items-center lg:py-2 lg:w-2/5 text-white mt-5 mb-5 relative">
                                <label for="password">密碼：</label>
                                <input
                                    type={passwordShown ? 'text' : 'password'}
                                    placeholder="請輸入6-8位英數密碼"
                                    className="input-style relative"
                                    onChange={(e) => {
                                        setpassword(e.target.value);
                                    }}
                                    name="password"
                                    id="password"
                                    minLength="6"
                                    maxLength="8"
                                />
                                <i
                                    onClick={() =>
                                        setPasswordShown(!passwordShown)
                                    }
                                    className="absolute top-10 right-2.5"
                                >
                                    {passwordShown ? (
                                        <FaEyeSlash className="w-5 h-5 text-yellow-400 inline-block hover:text-green-400 cursor-pointer" />
                                    ) : (
                                        <FaEye className="w-5 h-5 text-yellow-400 inline-block hover:text-green-400 cursor-pointer" />
                                    )}
                                </i>
                            </div>
                            <div className="lg:items-center lg:py-2 lg:w-2/5 text-white mt-5 relative">
                                <label for="confirmPassword">確認密碼：</label>
                                <input
                                    type="password"
                                    onBlur={checkpassword}
                                    placeholder="請輸入6-8位英數密碼"
                                    className="input-style relative"
                                    onChange={(e) => {
                                        setconfirmPassword(e.target.value);
                                    }}
                                    required
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    minLength="6"
                                    maxLength="8"
                                />
                                <div className="text-red-600">{message}</div>
                            </div>
                        </div>
                        <div className="py-1 mb-5">
                            <label for="email">信箱：</label>
                            <input
                                type="email"
                                id="email"
                                className="input-style "
                                placeholder="請輸入信箱"
                                onChange={(e) => {
                                    setemail(e.target.value);
                                }}
                                name="email"
                                required
                            />
                        </div>

                        {/* </from>
                </div> */}
                        <div className="bg-gray-700 pl-5 py-5 text-white text-opacity-85 text-3xl font-bold">
                            其他資料
                        </div>

                        {/* <from> */}
                        <div className="text-white bg-gray-900 w-full object-cover object-center text-opacity-85 text-lg pl-12 py-5 pr-10">
                            <div className=" py-2 mb-5">
                                <label for="phone">行動電話：</label>
                                <input
                                    type="phone"
                                    id="phone"
                                    className="input-style "
                                    placeholder="請輸入行動電話09xxxxxxxx"
                                    name="phone"
                                    pattern="09\d{2}-\d{6}"
                                    onChange={(e) => {
                                        setphone(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="py-2 mb-5">
                                <label for="address">住家地址</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="input-style"
                                    placeholder="請輸入地址    ex:台北市中山區羅斯福路x段x巷x弄x號x樓"
                                    name="address"
                                    onChange={(e) => {
                                        setaddress(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex flex-wrap mr-3 mb-6 justify-between">
                                <div className="items-center border-b py-2 md:w-2/5">
                                    <label for="birthday">生日：</label>
                                    <input
                                        type="date"
                                        id="birthday"
                                        value={birthday}
                                        onChange={(e) => {
                                            setbirthday(e.target.value);
                                        }}
                                        className="text-black"
                                        name="birthday"
                                    />
                                </div>
                                <div class="xl:inline-block xl:w-64 mt-5">
                                    <label for="gender">性別：</label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        onChange={(e) => {
                                            setgender(e.target.value);
                                        }}
                                        className="bg-transparent border-2 border-gray-700 w-40"
                                    >
                                        <option
                                            className="text-black"
                                            value="reserve"
                                        >
                                            保留
                                        </option>
                                        <option
                                            className="text-black"
                                            value="male"
                                        >
                                            男性
                                        </option>
                                        <option
                                            className="text-black"
                                            value="female"
                                        >
                                            女性
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div classNmae="mt-10"></div>
                            <label for="aboutme">關於我：</label>
                            <textarea
                                id="aboutme"
                                name="aboutme"
                                onChange={(e) => {
                                    setaboutme(e.target.value);
                                }}
                                className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none bg-transparent"
                                rows="4"
                            ></textarea>
                            <div className="justify-center flex">
                                <Link to="/">
                                    <button
                                        className="btn-green mr-10"
                                        type="button"
                                    >
                                        返回
                                    </button>
                                </Link>
                                <button className="btn-yellow">註冊</button>
                            </div>
                        </div>
                    </form>
                </div>
            </artical>
        </main>
    );
}

export default SignUp;
