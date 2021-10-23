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
                            購買紀錄
                        </div>
                        <section className="my-2.5 p-4 leading-relaxed border-2 border-yellow-400">
                            <h6 className="text-xl">注意事項：</h6>
                            <p>
                                1.產品均享有10天猶豫期之權益(注意！猶豫期非試用期)，若退/換回產品非全新狀態且包裝完整，將影響您的退貨權益及需負擔回復原狀責任。
                                <br />
                                2.個人衛生之商品暫不提供退/換貨，其它商品僅限換貨1次。
                                <br />
                                3.若無法線上操作，請與我們聯絡。
                            </p>
                            <h6 className="text-xl">退/換貨規範：</h6>
                            <p>
                                1.取消訂單，若有多個商品於同張訂單時，須同單其他商品一同取消、退貨。
                                <br />
                                2.限定配送狀態為『已送達』，且為同一品號之商品，方可進行換貨服務。
                            </p>
                        </section>
                        {/* SORTING BY DATE */}
                        {/* <div className="my-4 mx-auto flex items-center justify-between border-b-2 border-yellow-400 w-96">
                            <input
                                type="date"
                                className="outline-none bg-transparent"
                            />
                            <span>至</span>
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
