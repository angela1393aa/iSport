import React, { useState, useEffect, useRef } from 'react';

import PictureGroup from './PictureGroup';

import product from '../../../../../images/product/1002-3.png';

import {
    FaAngleLeft,
    FaAngleRight,
    FaAngleUp,
    FaAngleDown,
    FaCircle,
} from 'react-icons/fa';

function ProductPhoto(props) {
    const { productImg } = props;
    const [bigImg, setBigImg] = useState('1002-3.png');
    const [bigImgUrl, setBigImgUrl] = useState(null);

    const smallPhotoBox = useRef(null);
    // console.log(bigImg);

    // const bigImgUrl = require('../../../../../images/product/' + bigImg);

    useEffect(() => {
        // console.log(productImg);
        if (productImg) {
            setBigImg(productImg[0].img_name);
        }
    }, [productImg]);

    useEffect(() => {
        setBigImgUrl(require('../../../../../images/product/' + bigImg));
    }, [bigImg]);

    return (
        <>
            <div className="w-full sm:w-2/5 xl:w-1/2 flex sm:justify-end flex-col-reverse sm:flex-col-reverse xl:flex-row mr-2 lg:mr-5 py-3">
                {/* 小圖 */}
                <div className="w-full h-24 xl:w-28 xl:h-500 overflow-x-hidden xl:overflow-y-hidden mr-2 relative">
                    <div className="w-6 h-full xl:w-full xl:h-6 bg-gradient-to-r xl:bg-gradient-to-b from-gray-800 absolute top-0 left-0 cursor-pointer flex justify-center items-center z-10">
                        <FaAngleUp
                            onClick={() => {
                                const photoRef = smallPhotoBox.current;
                                photoRef.classList.remove('bottom-0');
                            }}
                            className="hidden xl:block text-2xl text-yellow-400"
                        />
                        <FaAngleLeft
                            onClick={() => {
                                const photoRef = smallPhotoBox.current;
                                photoRef.classList.remove('right-0');
                            }}
                            className="xl:hidden block text-2xl text-yellow-400"
                        />
                    </div>
                    <div className="w-6 h-full xl:w-full xl:h-6 sm:bg-gradient-to-l xl:bg-gradient-to-t from-gray-800 absolute bottom-0 right-0 cursor-pointer flex justify-center items-center z-10">
                        <FaAngleDown
                            onClick={() => {
                                const photoRef = smallPhotoBox.current;
                                photoRef.classList.add('bottom-0');
                            }}
                            className="hidden xl:block text-2xl text-yellow-400"
                        />
                        <FaAngleRight
                            onClick={() => {
                                const photoRef = smallPhotoBox.current;
                                photoRef.classList.add('right-0');
                            }}
                            className="xl:hidden block text-2xl text-yellow-400"
                        />
                    </div>
                    {/* 圖片群組 */}
                    <div
                        ref={smallPhotoBox}
                        className="flex w-auto flex-row xl:flex-col transition-all duration-300 absolute "
                    >
                        {productImg &&
                            productImg.map((item) => {
                                return (
                                    <PictureGroup
                                        key={item.id}
                                        id={item.id}
                                        imgName={item.img_name}
                                        bigImg={bigImg}
                                        setBigImg={setBigImg}
                                    />
                                );
                            })}
                    </div>
                </div>
                {/* 大圖 */}
                <div className="mb-5 w-full xl:w-500 rounded-lg overflow-y-hidden shadow-xl relative">
                    {/* <div className="sm:hidden h-full w-8 absolute left-0 top-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <FaAngleLeft className="text-lg text-white " />
                    </div>
                    <div className="sm:hidden h-full w-8 absolute right-0 top-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <FaAngleRight className="text-lg text-white " />
                    </div> */}
                    <img
                        src={bigImgUrl ? bigImgUrl.default : ''}
                        alt="product"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>
        </>
    );
}

export default ProductPhoto;
