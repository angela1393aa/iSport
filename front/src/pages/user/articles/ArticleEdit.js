import React, { useState, useEffect } from 'react';
import UserAside from '../components/UserAside';
import { useAuth } from '../../../context/auth';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from '../../../../node_modules/axios';
import { API_URL } from '../../../utils/config';
import NotAuth from '../components/NotAuth';
import { useParams } from 'react-router-dom';

function ArticleEdit() {
    const { member, setMember } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [user_name, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    // const [upload_date, setupload_date] = useState('');
    const [photos, setPhotos] = useState('');

    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(`${API_URL}/articles/${id}`);
                let resData = await res.data;
                setData(resData[0]);
                setError(null);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);

    useEffect(() => {
        if (data) {
            // setIid(data.id);
            setUsername(data.user_name);
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setPhotos(data.photos);
        }
    }, [data]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append('user_name', user_name);
            formData.append('title', title);
            // formData.append('upload_date', upload_date);
            formData.append('category', category);
            formData.append('content', content);
            formData.append('photos', photos);
            formData.append('id', id);
            let response = await axios.put(
                `${API_URL}/articles/${id}`,
                formData
            );
            alert('修改成功');
            console.log(response);
        } catch (e) {
            console.error(e.response);
        }
    };
    return (
        <>
            {member ? (
                <main className="max-w-screen-xl mx-auto px-2.5 py-5 flex justify-start border-red-300">
                    <UserAside />
                    <article className="flex-grow flex-col">
                        <div className="bg-gray-700 pl-5 py-5 text-white text-opacity-85 text-3xl rounded-t-xl font-bold">
                            修改文章
                        </div>
                        <div className="text-white bg-gray-900 w-full h-full object-cover object-center text-opacity-85 text-lg pl-12 py-5 pr-10">
                            <from onSubmit={handleSubmit}>
                                <label htmlFor="user_name">作者：</label>
                                <span className="text-base text-red-500 mx-4">
                                    必填
                                </span>
                                <br />
                                <input
                                    type="text"
                                    className="w-full bg-gray-900 border-b-2 my-4 focus:border-yellow-400 outline-none"
                                    name="user_name"
                                    id="user_name"
                                    placeholder="最多50字"
                                    required
                                    placeholder={member.name}
                                    value={user_name}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                ></input>
                                <br />
                                <label htmlFor="category">分類：</label>
                                <br />
                                <select
                                    name="category"
                                    id="category"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                    className="w-full bg-gray-900 border-b-2 my-4 focus:border-yellow-400 outline-none"
                                >
                                    <option value="0">請選擇</option>
                                    <option value="1">有氧運動</option>
                                    <option value="2">重量訓練</option>
                                    <option value="3">間歇訓練</option>
                                    <option value="5">核心強化</option>
                                    <option value="4">增肌飲食</option>
                                </select>
                                <br />
                                <label htmlFor="title">標題：</label>
                                <span className="text-base text-red-500 mx-4">
                                    必填
                                </span>
                                <br />
                                <input
                                    type="text"
                                    className="w-full bg-gray-900 border-b-2 my-4 focus:border-yellow-400 outline-none"
                                    name="title"
                                    id="title"
                                    placeholder="最多100字"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />

                                <br />
                                <img
                                    className="m-auto"
                                    src={`http://localhost:3030/articles/uploads/${photos}`}
                                    alt=""
                                />
                                <label htmlFor="photos">上傳圖片:</label>
                                <br />
                                <input
                                    className="w-full bg-gray-900 border-b-2 my-4 focus:border-yellow-400 outline-none"
                                    type="file"
                                    name="photos"
                                    id="photos"
                                    onChange={(e) => {
                                        setPhotos(e.target.files[0]);
                                    }}
                                />
                                <br />
                                <label htmlFor="content">內容：</label>
                                <span className="text-base text-red-500 mx-4">
                                    必填
                                </span>
                                <br />
                                <input
                                    type="text"
                                    className="w-full bg-gray-900 border-b-2 my-4 focus:border-yellow-400 outline-none"
                                    name="content"
                                    id="content"
                                    placeholder="最多100字"
                                    value={content}
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                />
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                    value={content}
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                ></p>
                                <div className="flex flex-row justify-end">
                                    <button
                                        className="btn-yellow flex flex-row justify-end items-center my-5"
                                        type="submit"
                                        id="button"
                                        onClick={handleSubmit}
                                    >
                                        <p className="font-bold text-xl mx-2">
                                            修改
                                        </p>
                                    </button>
                                </div>
                            </from>
                        </div>
                    </article>
                </main>
            ) : (
                <NotAuth />
            )}
        </>
    );
}

export default ArticleEdit;
