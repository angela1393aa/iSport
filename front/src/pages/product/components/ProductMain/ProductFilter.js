import React, { useState, useEffect, useRef } from 'react';
import {
    FaAngleUp,
    FaFilter,
    FaSearch,
    FaMinus,
    FaAngleDown,
} from 'react-icons/fa';

function ProductFilter(props) {
    const {
        setSearch,
        doSearch,
        search,
        brandList,
        setFilter,
        filter,
        doFilter,
        priceSort,
        setPriceSort,
        doSort,
        doSortNew,
        doSortHot,
    } = props;

    const [sortBtn, setSortBtn] = useState({
        priceBtn: false,
        newBtn: false,
        hotBtn: false,
    });

    const testRef = useRef(null);
    const handleClick = () => {
        const test = testRef.current;
        test.classList.toggle('max-h-52');
    };
    const handleFilter = (e) => {
        let newObj = {
            ...filter,
            [e.target.name]: e.target.value,
        };
        setFilter(newObj);
    };

    const handleSortActive = (e) => {
        let newObj = {
            priceBtn: false,
            newBtn: false,
            hotBtn: false,
            [e.target.name]: true,
        };
        setSortBtn(newObj);
    };

    const currentBtnStyle = (name) => {
        if (name) {
            return 'btn-yellow-sm mx-1 flex';
        } else {
            return 'btn-gray-sm mx-1 flex';
        }
    };

    const handlePriceSort = () => {
        priceSort ? setPriceSort(false) : setPriceSort(true);
    };

    return (
        <section className="mt-3 sm:mt-5">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
                <div className="flex items-center justify-between sm:justify-start">
                    <FaFilter
                        onClick={handleClick}
                        className="text-white text-2xl cursor-pointer mr-4"
                    />

                    <button
                        name="priceBtn"
                        onClick={(e) => {
                            handleSortActive(e);
                            handlePriceSort();
                        }}
                        className={currentBtnStyle(sortBtn.priceBtn)}
                    >
                        價格
                        {priceSort ? (
                            <FaAngleUp
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                name="priceBtn"
                                className="ml-1 text-xl"
                            />
                        ) : (
                            <FaAngleDown
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                name="priceBtn"
                                className="ml-1 text-xl"
                            />
                        )}
                    </button>
                    <button
                        name="newBtn"
                        onClick={(e) => {
                            handleSortActive(e);
                            doSortNew();
                        }}
                        className={currentBtnStyle(sortBtn.newBtn)}
                    >
                        最新
                    </button>
                    <button
                        name="hotBtn"
                        onClick={(e) => {
                            handleSortActive(e);
                            doSortHot();
                        }}
                        className={currentBtnStyle(sortBtn.hotBtn)}
                    >
                        最熱銷
                    </button>
                </div>
                <div className="mb-2 w-full sm:w-1/3 bg-gray-700 rounded-full flex items-center px-4 py-2">
                    <input
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                        className="bg-transparent outline-none border-none flex-grow placeholder-gray-700::placeholder text-white "
                        placeholder="關鍵字..."
                    />
                    <FaSearch
                        onClick={doSearch}
                        className="text-white text-xl cursor-pointer"
                    />
                </div>
            </div>

            <div
                ref={testRef}
                className="mt-3 bg-gray-900 rounded-lg overflow-hidden max-h-0 transition-all duration-300 "
            >
                <div className="grid grid-cols-1 sm:grid-cols-3 m-4 sm:m-6">
                    <div className=" mb-2 sm:mb-0 sm:mr-10 ">
                        <p className="text-sm sm:text-base border-l-2 border-yellow-400 text-white pl-3 mb-3">
                            價格區間
                        </p>
                        <div className="w-full xl:w-72 py-1 bg-gray-700 rounded-full flex justify-between items-center px-4">
                            <input
                                name="minPrice"
                                value={filter.minPrice}
                                onChange={handleFilter}
                                className="text-sm xl:text-base w-1/3 bg-transparent outline-none border-none placeholder-gray-700::placeholder text-white text-center "
                                placeholder="最小值"
                            />
                            <FaMinus className="mx-1 text-yellow-400 text-xl" />
                            <input
                                name="maxPrice"
                                value={filter.maxPrice}
                                onChange={handleFilter}
                                className="text-sm xl:text-base w-1/3 bg-transparent outline-none border-none placeholder-gray-700::placeholder text-white text-center"
                                placeholder="最大值"
                            />
                        </div>
                    </div>

                    <div className="mb-2 sm:mb-0">
                        <p className="border-l-2 border-yellow-400 text-white pl-3 mb-0 sm:mb-2.5">
                            品牌
                        </p>
                        <div className="">
                            <select
                                name="brand"
                                value={filter.brand}
                                onChange={handleFilter}
                                className="w-full xl:w-72 border-b-2 border-yellow-400 bg-gray-900 py-1 outline-none text-white"
                            >
                                <option value="0" key={0}>
                                    請選擇品牌
                                </option>
                                {brandList &&
                                    brandList.map((item) => {
                                        return (
                                            <option
                                                value={item.id}
                                                key={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={doFilter}
                        className="btn-gray-sm place-self-end mx-1"
                    >
                        篩選
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductFilter;
