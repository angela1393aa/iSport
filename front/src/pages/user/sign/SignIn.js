import React from 'react';
import {
    API_URL,
    REACT_APP_FACEBOOK_ID,
    REACT_APP_GOOGLE_ID,
} from '../../../utils/config';
import axios from 'axios';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaTimesCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../../context/auth';
import { Redirect, Link, ReactDOM } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { YourReCaptchaComponent } from '../components/YourReCaptchaComponent';
// import VCode from '../components/VCode';

function SignIn(props) {
    // 控制取得帳號密碼值
    const { member, setMember } = useAuth();
    // const { token, setToken } = useAuth();
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    const windowClose = () => {
        props.onCancel();
    };

    // 控制handleSumbit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post(
                `${API_URL}/auth/Signin`,
                {
                    account,
                    password,
                },
                //如果要同意跨原信任 需要將withCredentials改為true
                { withCredentials: true }
            );
            console.log(result);
            setMember(result.data);
            windowClose();
            alert('登入成功');
        } catch (e) {
            //透過e.response拿到axios的response
            console.error(e);
            //顯示錯誤訊息到前端，目前先使用alert顯示後面可以修改成套窗或者紅字顯示
            alert(e.response.data.message);
        }
    };
    //google
    const googleResponse = async (response) => {
        let result = await axios.post(
            `${API_URL}/auth/google`,
            {
                access_token: response.accessToken,
            },
            {
                withCredentials: true,
            }
        );
        console.log(result);
        setMember(result.data);
        alert('登入成功');
    };
    //facebook
    let facebookResponse = async (response) => {
        let result = await axios.post(
            `${API_URL}/auth/facebook`,
            {
                access_token: response.accessToken,
            },
            {
                withCredentials: true,
            }
        );
        console.log(result);
        setMember(result.data);
        alert('登入成功');
    };

    // 控制密碼顯示隱藏
    const [passwordShown, setPasswordShown] = useState(false);

    return (
        <form className="w-screen h-screen fixed z-40" onSubmit={handleSubmit}>
            <div
                id="module"
                className="w-full max-w-sm rounded justify-center flex-auto items-center transform -translate-y-1/2
                -translate-x-1/2 z-20 absolute top-1/2 left-1/2"
            >
                <div className="bg-gray-900 pl-5 py-5 text-white text-opacity-85 text-3xl rounded-t-xl font-bold relative">
                    登入
                    <FaTimesCircle
                        className="userIcons absolute flex right-0 cursor-pointer"
                        onClick={props.onCancel}
                    />
                </div>
                <div className="bg-gray-700 shadow-md rounded-b-xl px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label
                            className="block text-white text-base font-bold mb-2"
                            htmlFor="account"
                        >
                            帳號：
                        </label>
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                            id="account"
                            type="text"
                            placeholder="請輸入帳號"
                            value={account}
                            onChange={(e) => {
                                setAccount(e.target.value);
                            }}
                            required
                        />
                        <hr className="border-2 border-yellow-400" />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-white text-base font-bold mb-2 "
                            htmlFor="password"
                        >
                            密碼：
                        </label>
                        <input
                            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none relative"
                            placeholder="請輸入密碼"
                            id="password"
                            name="password"
                            type={passwordShown ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                        />
                        <i
                            onClick={() => setPasswordShown(!passwordShown)}
                            className="absolute top-52 right-10 transform translate-y-1"
                        >
                            {passwordShown ? (
                                <FaEyeSlash
                                    className="w-5 h-5 text-yellow-400 inline-block hover:text-green-400 cursor-pointer"
                                    title="隱藏密碼"
                                />
                            ) : (
                                <FaEye
                                    className="w-5 h-5 text-yellow-400 inline-block hover:text-green-400 cursor-pointer"
                                    title="顯示密碼"
                                />
                            )}
                        </i>
                        <hr className="border-2 border-yellow-400" />
                        {/* <Link to="/SearchPassword">
                            <button
                                className="font-bold text-sm text-red-500 hover:text-red-800 justify-end flex mt-1 mb-1"
                                onClick={props.onCancel}
                            >
                                忘記密碼?
                            </button>
                        </Link> */}
                        {/* <GoogleReCaptchaProvider reCaptchaKey="">
                            <YourReCaptchaComponent />
                        </GoogleReCaptchaProvider> */}
                        {/* <VCode /> */}
                        <div className="flex items-center justify-center mt-2">
                            <Link to="/SignUp">
                                <button
                                    className="btn-green mr-10"
                                    type="button"
                                    onClick={props.onCancel}
                                >
                                    註冊
                                </button>
                            </Link>

                            <button type="submit" className="btn-yellow">
                                登入
                            </button>
                        </div>
                        <GoogleLogin
                            clientId={REACT_APP_GOOGLE_ID}
                            buttononText="Login"
                            onSuccess={googleResponse}
                            onFailure={(err) => console.log('fail', err)}
                            render={(renderProps) => (
                                <p onClick={props.onCancel}>
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className="bg-white w-64 h-16 flex relative mt-2 mb-2"
                                    >
                                        <FcGoogle className="w-10 h-10 absolute top-2" />
                                        <p className="font-sans font-black text-2xl absolute top-4 left-14">
                                            Google Login
                                        </p>
                                    </button>
                                </p>
                            )}
                        />
                        <FacebookLogin
                            appId={REACT_APP_FACEBOOK_ID}
                            onClick={props.onCancel}
                            autoLoad={false}
                            callback={facebookResponse}
                            render={(renderProps) => (
                                <button onClick={renderProps.onClick}>
                                    This is my custom FB button
                                </button>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div
                className="bg-black bg-opacity-50 w-screen h-screen fixed z-10"
                onClick={props.onCancel}
            ></div>
        </form>
    );
}
export default SignIn;
