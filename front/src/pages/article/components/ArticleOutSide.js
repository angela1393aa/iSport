import React, { useState } from 'react';
// import Person2 from '../../../../../back/public/articles/uploads/';
import { FaClock } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ArticleOutSide = (props) => {
    const { article } = props;
    return (
        <>
            <Link to={'/article/' + article.id} className="max-w-max m-auto">
                <div className="border-4 border-light-blue-500 border-opacity-100 p-5 m-5">
                    {/* <img
                        className="m-auto w-1/2"
                        src={`http://localhost:3030/articles/uploads/${article.photos}`}
                        alt=""
                    /> */}
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
                                {article.upload_date}
                            </h4>
                            <FaEye className="text-yellow-400 mr-1" />
                            <h4 className="text-sm text-white mr-4">
                                {article.views}
                            </h4>
                        </div>
                        <div className="flex items-center"></div>
                    </div>
                    <div className="m-2">
                        <p
                            className="text-base leading-loose tracking-wide text-white overflow-ellipsis overflow-hidden line-clamp-10 h-80 "
                            dangerouslySetInnerHTML={{
                                __html: article.content,
                            }}
                        ></p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ArticleOutSide;
