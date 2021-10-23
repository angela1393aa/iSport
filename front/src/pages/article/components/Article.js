import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';
import { APP_URL, API_URL } from './../../../utils/config';
import { FaRegHeart } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import {
    RiShareForwardLine,
    RiShareForwardFill,
    RiThumbUpLine,
    RiThumbUpFill,
    RiHeartFill,
    RiHeartLine,
} from 'react-icons/ri';
import moment from 'moment';
import axios from 'axios';
import { useAuth } from '../../../context/auth';

const Article = (props) => {
    const { id: articleId, article, signInWindow, setSignInWindow } = props;
    const { member, setMember } = useAuth();
    const location = useLocation();
    const [liked, setLiked] = useState(false);
    const [ILiked, setILiked] = useState(false);
    const [copiedAlert, setCopiedAlert] = useState(false);
    const [collect, setCollect] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCopiedAlert(false);
        }, 2000);
        return () => clearInterval(timeout);
    }, [copiedAlert]);

    const handleDislike = () => {
        setLiked(false);
        if (member) {
            (async function () {
                await axios.patch(
                    `${API_URL}/articles/${articleId}`,
                    { like: 'dislike' },
                    { withCredentials: true }
                );
            })();
        }
    };

    const handleLike = () => {
        member ? setLiked(true) : setSignInWindow(true);
        if (member) {
            (async function () {
                await axios.patch(
                    `${API_URL}/articles/${articleId}`,
                    { like: 'like' },
                    { withCredentials: true }
                );
            })();
        }
    };

    const handleRemoveCollection = () => {
        setCollect(false);
        if (member) {
            (async function () {
                await axios.patch(
                    `${API_URL}/articles/${articleId}`,
                    { collect: 'removeCollection' },
                    { withCredentials: true }
                );
            })();
        }
    };

    const handleAddCollection = () => {
        member ? setCollect(true) : setSignInWindow(true);
        if (member) {
            (async function () {
                await axios.patch(
                    `${API_URL}/articles/${articleId}`,
                    { collect: 'addCollection' },
                    { withCredentials: true }
                );
            })();
        }
    };

    return (
        <>
            <div className="border-4 border-light-blue-500 border-opacity-100 p-5 my-5 break-all">
                <img
                    className="m-auto"
                    src={`http://localhost:3030/articles/uploads/${article.photos}`}
                    alt=""
                />
                <h3 class="text-xl lg:text-2xl xl:text-4xl m-2 text-yellow-400">
                    {article.title}
                </h3>
                <div className="m-2 md:flex md:justify-between">
                    <div className="flex items-center">
                        <BsFillPersonFill className="text-yellow-400 mr-1 cursor-pointer" />
                        <h4 className="text-sm text-white mr-4">
                            {article.user_name}
                        </h4>
                        <FaClock className="text-yellow-400 mr-1" />
                        <h4 className="text-xs text-white mr-4">
                            {moment(article.upload_date).format(
                                'YYYY-MM-DD HH:mm'
                            )}
                        </h4>
                        <FaEye className="text-yellow-400 mr-1" />
                        <h4 className="text-sm text-white mr-4">
                            {article.views}
                        </h4>
                    </div>
                    <div className="flex items-center">
                        {liked ? (
                            <div
                                className="flex mr-4 items-center cursor-pointer"
                                onClick={() => handleDislike()}
                            >
                                <RiThumbUpFill className="text-yellow-400 mr-1" />
                                <span className="text-xs text-white w-max">
                                    {ILiked ? article.likes : article.likes + 1}
                                </span>
                            </div>
                        ) : (
                            <div
                                className="flex mr-4 items-center cursor-pointer"
                                onClick={() => handleLike()}
                            >
                                <RiThumbUpLine className="text-yellow-400 mr-1" />
                                <span className="text-xs text-white w-max">
                                    {ILiked ? article.likes - 1 : article.likes}
                                </span>
                            </div>
                        )}
                        {copiedAlert ? (
                            <div className="flex mr-4 items-center cursor-pointer">
                                <RiShareForwardFill className="text-yellow-400 mr-1" />
                                <span className="text-xs text-white w-max">
                                    已複製連結
                                </span>
                            </div>
                        ) : (
                            <div
                                className="flex mr-4 items-center cursor-pointer"
                                onClick={() => {
                                    setCopiedAlert(true);
                                    navigator.clipboard.writeText(
                                        APP_URL + location.pathname
                                    );
                                }}
                            >
                                <RiShareForwardLine className="text-yellow-400 mr-1" />
                                <span className="text-xs text-white w-max">
                                    點擊分享
                                </span>
                            </div>
                        )}

                        {collect ? (
                            <div
                                className="flex mr-4 items-center cursor-pointer"
                                onClick={() => handleRemoveCollection()}
                            >
                                <RiHeartFill className="text-red-400 mr-1" />
                                <span className="text-xs text-white w-max">
                                    已收藏
                                </span>
                            </div>
                        ) : (
                            <div
                                className="flex mr-4 items-center cursor-pointer"
                                onClick={() => handleAddCollection()}
                            >
                                <RiHeartLine className="text-red-400 mr-1" />
                                <span className="text-xs text-white w-max">
                                    收藏
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="m-2">
                    <p
                        className="text-base leading-loose tracking-wide text-white"
                        dangerouslySetInnerHTML={{
                            __html: article.content,
                        }}
                    ></p>
                </div>
            </div>
        </>
    );
};

export default Article;
