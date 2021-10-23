import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserAside from '../components/UserAside';
import ArticleMyartItem from './ArticleMyartItem';
import { useAuth } from '../../../context/auth';
import NotAuth from '../components/NotAuth';
import { API_URL } from '../../utils/config';
import axios from 'axios';

function ArticleMyart() {
    const { member, setMember } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(`${API_URL}/articles/MyArticle`, {
                    withCredentials: true,
                });
                res = res.data;
                setData(res);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);
    console.log(data);
    //刪除
    const handleDelete = async (id) => {
        setData(data.filter((article) => article.id !== id));
        let res = axios.delete(`${API_URL}/articles/${id}`, {
            withCredentials: true,
        });
        alert('刪除完成');
    };
    return (
        <>
            {member ? (
                <main className="max-w-screen-xl mx-auto px-2.5 py-5 flex justify-start border-red-300">
                    <UserAside />
                    <artical className="flex-grow flex-col">
                        <div className="bg-gray-700 pl-5 p-3 text-white text-opacity-85 text-3xl rounded-t-xl font-bold  flex justify-between">
                            我的文章
                            <Link to="/user/ArticleAdd">
                                <button type="submit" id="button">
                                    <p className="font-bold text-xl mx-2">
                                        新增
                                    </p>
                                </button>
                            </Link>
                        </div>
                        <div className="text-white bg-gray-900 w-full min-h-screen object-cover object-center text-opacity-85 text-lg pl-12 py-5 pr-10 rounded-b-xl">
                            <div className="mt-6">
                                {data &&
                                    data.map((article) => (
                                        <ArticleMyartItem
                                            article={article}
                                            key={article.id}
                                            handleDelete={handleDelete}
                                        />
                                    ))}
                            </div>
                        </div>
                    </artical>
                </main>
            ) : (
                <NotAuth />
            )}
        </>
    );
}
export default ArticleMyart;
