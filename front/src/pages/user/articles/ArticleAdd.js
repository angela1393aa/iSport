import React, { useState } from 'react';
import UserAside from '../components/UserAside';
import { useAuth } from '../../../context/auth';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from '../../../../node_modules/axios';
import { API_URL } from '../../../utils/config';
import NotAuth from '../components/NotAuth';

function ArticleAdd() {
    const { member, setMember } = useAuth();
    const [user_name, setuser_name] = useState('');
    const [title, settitle] = useState('');
    const [content, setcontent] = useState('');
    const [category, setcategory] = useState('');
    // const [upload_date, setupload_date] = useState('');
    const [photos, setPhotos] = useState('');

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
            let response = await axios.post(`${API_URL}/articles/`, formData);
            alert('新增文章成功');
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
                            新增文章
                        </div>
                        <div className="text-white bg-gray-900 min-h-screen w-full object-cover object-center text-opacity-85 text-lg pl-12 py-5 pr-10 rounded-b-xl">
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
                                        setuser_name(e.target.value);
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
                                        setcategory(e.target.value);
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
                                        settitle(e.target.value);
                                    }}
                                />
                                <br />
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
                                <div id="toolbar-container"></div>
                                <div id="editor"></div>
                                <Editor
                                    toolbarClassName="toolbar"
                                    wrapperClassName="wrapper border-2 border-white rounded bg-gray-800"
                                    editorClassName="editor px-5 h-40"
                                    onEditorStateChange={(editorState) => {
                                        console.log(
                                            editorState
                                                .getCurrentContent()
                                                .getPlainText()
                                        );

                                        setcontent(
                                            editorState
                                                .getCurrentContent()
                                                .getPlainText()
                                        );
                                    }}
                                />
                                <div className="flex flex-row justify-end">
                                    <button
                                        className="btn-yellow flex flex-row justify-end items-center my-5"
                                        type="submit"
                                        id="button"
                                        onClick={handleSubmit}
                                    >
                                        <p className="font-bold text-xl mx-2">
                                            新增
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

export default ArticleAdd;
