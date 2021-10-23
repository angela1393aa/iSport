import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import ArticleHeader from '../../images/tabata/1.jpeg';
import ArticleNav from './components/ArticleNav';
import SuggestVideoCol from '../video/components/SuggestVideoCol';
import SuggestArtCol from '../video/components/SuggestArtCol';
import Comment from '../video/components/Comment';
import Person2 from './../../images/tabata/1.jpeg';
import {
    FaComments,
    FaClock,
    FaThumbsUp,
    FaShare,
    FaRegHeart,
    FaEye,
} from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { API_URL } from '../../utils/config';
import axios from 'axios';
import Article from './components/Article';
// 模擬從伺服器來的資料
// import { data } from '../data/';

function ArticleId({ signInWindow, setSignInWindow }) {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(`${API_URL}/articles/${id}`);
                let data = res.data;
                setData(data);
                setError(null);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);

    return (
        <>
            <main className="max-w-screen-2xl flex justify-center m-auto">
                <div className="mx-8 w-9/12">
                    <div className="">
                        {data &&
                            data.map((article) => (
                                <Article
                                    article={article}
                                    key={article.id}
                                    id={article.id}
                                    signInWindow={signInWindow}
                                    setSignInWindow={setSignInWindow}
                                />
                            ))}
                    </div>
                    {/* <div>
                        <div className="flex items-center mb-7">
                            <FaComments className="text-yellow-400 mr-1 text-lg" />
                            <span className="text-base text-white mr-4">
                                48 則留言
                            </span>
                        </div>
                        <div className="flex mb-7">
                            <img
                                className="w-12 h-12 rounded-full mr-4"
                                src={Person2}
                                alt=""
                            />
                            <div className="flex flex-col w-full">
                                <input
                                    className="pb-1 placeholder-white text-base text-white border-b border-gray-400 bg-gray-800
                        self-start w-full focus:outline-none focus:placeholder-gray-400 focus:border-white mb-2"
                                    placeholder="新增留言"
                                />
                                <div className="flex justify-end">
                                    <button className="btn-gray-sm mr-3">
                                        取消
                                        </button>
                                    <button className="btn-yellow-sm">
                                        留言
                                        </button>
                                </div>
                            </div>
                        </div>
                        <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                    </div> */}
                </div>

                <div className="mr-8 w-4/12 xl:flex xl:flex-col hidden">
                    <div className="mt-6">
                        <h3 className="text-xl text-white pb-2 border-b-2 border-yellow-400">
                            推薦文章
                        </h3>
                        <SuggestArtCol />
                    </div>
                    <div>
                        <h3 className="text-xl text-white pb-2 border-b-2 border-yellow-400 mt-8">
                            推薦影片
                        </h3>
                        <SuggestVideoCol />
                    </div>
                </div>
            </main>
        </>
    );
}

export default withRouter(ArticleId);
