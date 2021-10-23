import React, { useState, useEffect } from 'react';
import ArticleHeader from '../../images/tag/a90617e463dc4c29845bbf875424958d.jpeg';
import ArticleNav from './components/ArticleNav';
import ArticleOutSide from './components/ArticleOutSide';
import { Link, withRouter } from 'react-router-dom';
import { API_URL } from '../../utils/config';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
function ArticleTABATATraining({ article }) {
    const [data, setData] = useState(null);
    const [allData, setAllData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(`${API_URL}/articles/TABATATraining`);
                let data = res.data;
                console.log(data);
                setData(data);
                setAllData(data);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);

    const [term, setTerm] = useState('');
    const handleUpdateButton = () => {
        let newArticles = data.sort(
            (a, b) =>
                b.upload_date.replace(/-/gi, '').replace(' ', '') -
                a.upload_date.replace(/-/gi, '').replace(' ', '')
        );
        setData([...newArticles]);
    };
    const handleViewsButton = () => {
        let newArticles = data.sort((a, b) => b.views - a.views);
        setData([...newArticles]);
    };
    const handleSearch = (e) => {
        e.preventDefault();

        let newArticles = allData.filter(
            (art) =>
                art.title.indexOf(term) > -1 || art.content.indexOf(term) > -1
        );
        setData([...newArticles]);
    };
    const handleEmpty = (e) => {
        if (e.target.value === '') setData(allData);
    };

    return (
        <>
            <div>
                <div className="relative">
                    <img
                        className="object-cover w-full h-44 xs:h-64 sm:h-72 md:h-96 lg:h-112 z-0  filter brightness-50"
                        src={ArticleHeader}
                        alt=""
                    />
                    <div className="absolute bottom-0 md:bottom-20 z-20 md:mx-10">
                        <h3 className="text-2xl md:text-5xl text-white py-4">
                            間歇訓練TABATA Training
                        </h3>
                        <h4 className="text-1xl md:text-2xl leading-loose text-white md:pr-40">
                            進行「TABATA」間歇訓練必須全力以赴！必須在4分鐘內讓自己到達極限，就算停止運動，身體仍會以為還在持續運動，所以會不斷燃燒卡路里。
                        </h4>
                    </div>
                </div>
                <div className=" z-40">
                    <ArticleNav />
                </div>
                <main className="max-w-screen-2xl mx-auto">
                    {/* Buttons & Search */}
                    <div className="flex my-6 mx-20 justify-between flex-col xs:flex-row">
                        <div className="flex mb-2.5 xs:mb-0">
                            <button
                                className="btn-gray-sm mr-4"
                                onClick={handleUpdateButton}
                            >
                                最新上傳
                            </button>
                            <button
                                className="btn-yellow-sm mr-4"
                                onClick={handleViewsButton}
                            >
                                最多觀看
                            </button>
                        </div>
                        <form
                            className="relative flex"
                            onSubmit={(e) => handleSearch(e)}
                        >
                            <input
                                type="text"
                                className="placeholder-white text-white bg-gray-700 border border-solid border-gray-700
                                    text-base px-4 py-1.5 rounded-full outline-none ease-linear
                                    transition-all duration-150 w-full xs:w-56 xs:focus:w-60 sm:w-80 sm:focus:w-96 focus:placeholder-gray-400
                                    "
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                onKeyUp={(e) => handleEmpty(e)}
                                placeholder="搜尋"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 flex text-xl m-1 p-1.5 transform -translate-y-px"
                            >
                                <FaSearch className="hover:text-white text-gray-200" />
                            </button>
                        </form>
                    </div>
                    <div className="w-3/4 m-auto">
                        {data &&
                            data.map((article) => (
                                <ArticleOutSide
                                    article={article}
                                    key={article.id}
                                />
                            ))}
                    </div>
                </main>
            </div>
        </>
    );
}

export default withRouter(ArticleTABATATraining);
