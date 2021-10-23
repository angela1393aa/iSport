import React from 'react';
import { useHistory } from 'react-router-dom';
import UserAside from './components/UserAside';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/config';
import { useAuth } from '../../context/auth';
import NotAuth from './components/NotAuth';
import DeleteAccountModal from './components/DeleteAccountModal';

function Users() {
    const { member, setMember } = useAuth();
    const [tempMember, setTempMember] = useState({ ...member });
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const history = useHistory();
    const userdataForm = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let require = await axios.put(
            `${API_URL}/users/${member.account}`,
            tempMember,
            {
                withCredentials: true,
            }
        );
        setMember(require.data);
        try {
            alert('修改成功');
            // window.location.reload();
        } catch (e) {
            console.error(e.require);
        }
    };

    useEffect(() => {
        setTempMember({ ...member });
    }, [member]);

    const handleDeleteAccount = async () => {
        let require = await axios.delete(`${API_URL}/users/${member.account}`, {
            withCredentials: true,
        });
        setMember(null);
        history.push('/');
    };

    const handleCancelDelete = () => {
        setDeleteAccountModal(false);
    };

    return (
        <>
            {deleteAccountModal && (
                <DeleteAccountModal
                    onDelete={handleDeleteAccount}
                    onCancel={handleCancelDelete}
                    memberName={(member && member.name) || null}
                />
            )}
            {member ? (
                <main className="max-w-screen-xl mx-auto px-2.5 py-5 flex justify-start border-red-300">
                    <UserAside />
                    <article className="flex-grow flex-col">
                        <div className="bg-gray-700 pl-5 py-5 text-white text-opacity-85  rounded-t-xl user-page-title">
                            會員資料
                            <span className="text-base text-red-500	">
                                (必填)
                            </span>
                        </div>
                        <div className="text-white bg-gray-900 w-full object-cover object-center text-opacity-85 text-lg pl-12 py-5 pr-10 rounded-b-xl">
                            <form onSubmit={handleSubmit} ref={userdataForm}>
                                <br />
                                <div className="items-center  py-2">
                                    <label for="name">姓名：</label>
                                    <input
                                        type="text"
                                        className="input-style "
                                        aria-label="Full name"
                                        id="name"
                                        name="name"
                                        value={tempMember.name}
                                        onChange={(e) => {
                                            setTempMember({
                                                ...tempMember,
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <br />
                                <div className="lg:flex lg:flex-wrap mr-3 mb-6 lg:justify-between text-white">
                                    <div className="lg:items-center lg:py-2 lg:w-2/5 text-white mt-5 mb-5 relative">
                                        <label for="account">帳號：</label>
                                        <input
                                            type="text"
                                            value={tempMember.account}
                                            className="input-style lg:items-center  border-b "
                                            placeholder=""
                                            name="account"
                                            disabled
                                        />
                                        <p className="flex text-red-700 text-sm absolute  right-0 bottom-3">
                                            不可修改
                                        </p>
                                    </div>
                                    <div className="lg:items-center lg:py-2 lg:w-2/5 text-white mt-5 mb-5">
                                        <label for="password">密碼：</label>
                                        <input
                                            type="password"
                                            className="input-style lg:items-center  border-b"
                                            name="password"
                                            placeholder="更換密碼時請輸入新密碼"
                                            onChange={(e) => {
                                                setTempMember({
                                                    ...tempMember,
                                                    password: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 mb-5">
                                    <label for="email">信箱：</label>
                                    <input
                                        type="email"
                                        className="input-style "
                                        name="email"
                                        id="email"
                                        value={tempMember.email}
                                        onChange={(e) => {
                                            setTempMember({
                                                ...tempMember,
                                                email: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className=" mt-5 mb-5">
                                    <label for="phone">行動電話：</label>
                                    <input
                                        type="phone"
                                        className="input-style"
                                        value={
                                            tempMember.phone
                                                ? tempMember.phone
                                                : member.phone
                                        }
                                        name="phone"
                                        onChange={(e) => {
                                            setTempMember({
                                                ...tempMember,
                                                phone: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="mt-5 mb-5 xs:text-base text-sm">
                                    <label for="address">住家地址：</label>
                                    <input
                                        type="text"
                                        className="input-style overflow-x-auto"
                                        name="address"
                                        value={tempMember.address}
                                        onChange={(e) => {
                                            setTempMember({
                                                ...tempMember,
                                                address: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                {/* </from> */}
                                {/* </div> */}
                                <div className="bg-gray-700 pl-5 py-5 text-white text-opacity-85 user-page-title">
                                    其他資料
                                </div>

                                {/* <from> */}
                                <div className="text-white bg-gray-900 w-full object-cover object-center text-opacity-85 text-lg pl-12 py-5 pr-10">
                                    <div className="flex flex-wrap mr-3 mb-6 justify-between">
                                        <div className="items-center border-b py-2 md:w-2/5 mb-5">
                                            <label for="birthday">生日：</label>
                                            <input
                                                type="date"
                                                value={tempMember.birthday}
                                                className="ml-10 bg-gray-700 border-none  text-white mr-3 py-1 px-2 leading-tight focus:outline-none relative"
                                                name="birthday"
                                                onChange={(e) => {
                                                    setTempMember({
                                                        ...tempMember,
                                                        birthday:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                            <div className="absolute transform translate-y-4 bg-black text-s text-gray-400">
                                                <p className="text-gray-400">
                                                    您的生日: {member.birthday}
                                                </p>
                                            </div>
                                        </div>

                                        <div class="xl:inline-block xl:w-64 mt-5">
                                            <label for="gender">性別：</label>
                                            <select
                                                value={tempMember.gender}
                                                name="gender"
                                                className="bg-transparent border-2 border-gray-700 w-40"
                                                onChange={(e) => {
                                                    setTempMember({
                                                        ...tempMember,
                                                        gender: e.target.value,
                                                    });
                                                }}
                                            >
                                                <option
                                                    className="text-black"
                                                    value="null"
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
                                    <label for="aboutme">關於我：</label>
                                    <textarea
                                        value={tempMember.aboutme}
                                        id="aboutme"
                                        name="aboutme"
                                        class="w-full px-3 py-2 text-white border rounded-lg focus:outline-none bg-transparent"
                                        rows="4"
                                        onChange={(e) => {
                                            setTempMember({
                                                ...tempMember,
                                                aboutme: e.target.value,
                                            });
                                        }}
                                    ></textarea>
                                    {tempMember && (
                                        <div className="justify-center flex">
                                            <button
                                                type="submit"
                                                className="btn-yellow"
                                            >
                                                更改個人資料
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="text-red-700 font-bold flex ml-auto"
                                        onClick={() =>
                                            setDeleteAccountModal(true)
                                        }
                                    >
                                        刪除帳號
                                    </button>
                                </div>
                            </form>
                        </div>
                    </article>
                </main>
            ) : (
                <NotAuth />
            )}
        </>
    );
}

export default Users;
