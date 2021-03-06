import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../utils/config';
import { useAuth } from '../../../context/auth';
import { FaSearch } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import axios from 'axios';
import UserAside from '../components/UserAside';
import NotAuth from '../components/NotAuth';
import OrderRecord from './components/OrderRecord';

function Order(props) {
    const { member, setMember } = useAuth();
    const { cartAdd } = props;
    const page = 8;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const getOrderRecord = async () => {
        try {
            let res = await axios.post(
                `${API_URL}/order`,
                {},
                {
                    withCredentials: true,
                }
            );
            let data = res.data.orders;
            pageCount(data);
            setData(data);
            setError(null);
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
    };

    useEffect(() => {
        getOrderRecord();
        cartAdd();
    }, [member]);

    const pageCount = (data) => {
        // Pagination
        let total = Math.ceil(data.length / page);
        setTotalPages(total);
        if (total === 1) setCurrentPage(1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const changePage = (e) => {
        setCurrentPage(parseInt(e.target.innerHTML));
    };

    const currentPageClass =
        'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative text-white bg-gray-800';

    const notCurrentPageClass =
        'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative text-white bg-gray-700 hover:bg-gray-800';

    const prevNextPageClass =
        'first:ml-0 text-lg font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative text-white bg-gray-700 hover:bg-gray-800';

    return (
        <>
            {member ? (
                <main className="max-w-screen-xl mx-auto px-2.5 py-5 flex justify-start border-red-300">
                    <UserAside />
                    <article className="flex-grow flex-col rounded-lg overflow-hidden text-white text-opacity-85 shadow-2xl ">
                        <div className="bg-gray-700 pl-5 py-5 user-page-title font-bold">
                            ????????????
                        </div>
                        <section className="my-2.5 p-4 leading-relaxed border-2 border-yellow-400">
                            <h6 className="text-xl">???????????????</h6>
                            <p>
                                1.???????????????10?????????????????????(??????????????????????????????)?????????/?????????????????????????????????????????????????????????????????????????????????????????????????????????
                                <br />
                                2.????????????????????????????????????/?????????????????????????????????1??????
                                <br />
                                3.?????????????????????????????????????????????
                            </p>
                            <h6 className="text-xl">???/???????????????</h6>
                            <p>
                                1.???????????????????????????????????????????????????????????????????????????????????????????????????
                                <br />
                                2.????????????????????????????????????????????????????????????????????????????????????????????????
                            </p>
                        </section>
                        {/* SORTING BY DATE */}
                        {/* <div className="my-4 mx-auto flex items-center justify-between border-b-2 border-yellow-400 w-96">
                            <input
                                type="date"
                                className="outline-none bg-transparent"
                            />
                            <span>???</span>
                            <input
                                type="date"
                                className="outline-none bg-transparent"
                            />
                            <FaSearch className=" text-xl" />
                        </div> */}
                        <section className="text-white bg-gray-900 w-full order-record-page-height object-cover object-center text-opacity-85 text-lg lg:px-10 px-4 py-6 rounded-b-xl">
                            {/* ORDER RECORD CARDS */}
                            {data &&
                                data
                                    .slice(
                                        (currentPage - 1) * page,
                                        currentPage * page
                                    )
                                    .map((item) => (
                                        <OrderRecord
                                            key={item.id}
                                            img={item.detail[0].img.img_name}
                                            order_no={item.order_no}
                                            order_date={item.order_date.slice(
                                                0,
                                                10
                                            )}
                                            price={item.price}
                                            paytype={item.paytype}
                                            delivery={item.delivery}
                                            status={item.order_status}
                                            total_amount={item.total_amount}
                                            detail={item.detail}
                                        />
                                    ))}
                            {/* PAGINATION */}
                            <div className="flex justify-center pb-5">
                                {totalPages !== 1 && (
                                    <button
                                        className={prevNextPageClass}
                                        onClick={prevPage}
                                    >
                                        <BiChevronLeft />
                                    </button>
                                )}
                                {[...Array(totalPages).keys()].map((n) => (
                                    <button
                                        className={
                                            currentPage === n + 1
                                                ? currentPageClass
                                                : notCurrentPageClass
                                        }
                                        key={n + 1}
                                        onClick={(e) => changePage(e)}
                                    >
                                        {n + 1}
                                    </button>
                                ))}
                                {totalPages !== 1 && (
                                    <button
                                        className={prevNextPageClass}
                                        onClick={nextPage}
                                    >
                                        <BiChevronRight />
                                    </button>
                                )}
                            </div>
                        </section>
                    </article>
                </main>
            ) : (
                <NotAuth />
            )}
        </>
    );
}

export default Order;
