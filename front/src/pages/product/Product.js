import React, { useState, useEffect } from 'react';

import ProductNav from './components/ProductNav';
import ProductMain from './components/ProductMain/';

import dataTest from './data/dataTest';

import { FaAngleUp } from 'react-icons/fa';

import { withRouter, useParams } from 'react-router-dom';

function Product(props) {
    const { category } = useParams();

    const [refresh, setRefresh] = useState(true);
    const [photo, setPhoto] = useState('');

    const [categoryData, setCategoryData] = useState({
        category: '',
        smTitle: '',
        bigTitle: '',
        photo: '',
    });

    useEffect(() => {
        //使用網址上的id和伺服器要資料
        const category = props.match.params.category;

        const newProduct = dataTest.find((item) => {
            return item.category === category;
        });

        if (newProduct) {
            setCategoryData(newProduct);
            setPhoto(
                require('../../images/product/header/' + newProduct.photo)
            );
        }
    }, [category]);

    return (
        <>
            {/* <div className=" w-8 h-8 xl:w-14 xl:h-14 rounded-full bg-yellow-400 text-gray-900 flex justify-center items-center cursor-pointer fixed right-5 bottom-16 z-50">
                <FaAngleUp className="text-3xl sm:text-4xl  xl:text-5xl" />
            </div> */}
            <header className="relative w-full h-56 xl:h-112 overflow-hidden">
                <div className="text-white absolute w-1/2 top-1/2 left-5 sm:left-14 xl:left-32 transform -translate-y-1/2">
                    <p className="text-sm sm:text-base xl:text-2xl break-all w-full leading-normal">
                        {categoryData.smTitle}
                    </p>
                    <h1 className="text-lg sm:text-3xl xl:text-5xl break-all w-full leading-normal">
                        {categoryData.bigTitle}
                    </h1>
                </div>
                <figure className="h-full w-full ">
                    <img
                        src={photo.default}
                        alt=""
                        className="w-full h-full object-cover object-center"
                    />
                </figure>
            </header>
            <ProductNav refresh={refresh} setRefresh={setRefresh} />
            <ProductMain refresh={refresh} />
        </>
    );
}

export default withRouter(Product);
