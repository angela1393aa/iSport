import HomePage9 from './../../images/homepage/homepage-9.jpg';
import HomePage10 from './../../images/homepage/homepage-10.jpg';
import HomePage11 from './../../images/homepage/homepage-11.jpg';
import HomePage12 from './../../images/homepage/homepage-12.jpg';
import HomePage13 from './../../images/homepage/homepage-13.jpg';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';

const ProductSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-back',
            delay: 100,
        });
        AOS.refresh();
    }, []);
    return (
        <div
            className="flex pt-24 pb-8 sm:py-20 md:py-12 lg:py-14 xl:py-16 w-full"
            id="productcard"
        >
            <div
                className="w-full md:w-1/3 h-full md:h-124 lg:h-152 xl:h-175 md:mr-6 lg:mr-8 xl:mr-10 relative"
                data-aos="fade-right"
                data-aos-duration="1500"
            >
                <img
                    src={HomePage13}
                    className="w-full h-80 md:h-full md:rounded-3xl object-cover object-top md:object-center"
                />
                <div
                    className="absolute h-80 w-full bg-black bg-opacity-50 bottom-0 md:bottom-16
                            pt-16 md:pt-8 2xs:px-6 xs:px-12 md:px-6"
                    id="product"
                >
                    <h2
                        className="absolute -top-16 left-1/2 transform -translate-x-1/2 sm:-translate-x-0 sm:static
                                pb-2.5 sm:pb-0 border-b-2 border-yellow-400 sm:border-0 text-white text-2xl lg:text-3xl xl:text-4xl"
                        data-aos="fade-up"
                        data-aos-anchor="#product"
                        data-aos-anchor-placement="top-center"
                    >
                        多樣商品
                    </h2>
                    <p
                        className="text-white text-xl xs:text-2xl md:text-xl lg:text-2xl sm:border-l-4 border-yellow-400
                                pl-5 lg:pl-7 py-4 lg:py-6 sm:ml-8 lg:ml-10 mt-7 mb-3 flex flex-col items-center sm:block"
                        data-aos="fade-up"
                        data-aos-anchor="#product"
                        data-aos-anchor-placement="top-center"
                    >
                        眾多精選商品，
                        <span className="pt-1.5">讓你在健康的道路上加分。</span>
                    </p>
                    <Link to="/products">
                        <button
                            className="text-gray-800 bg-yellow-400 border border-solid border-yellow-400 uppercase
                                    rounded-full outline-none ease-linear transition-all duration-150 block
                                    hover:bg-yellow-500 hover:border-yellow-500 active:bg-yellow-500
                                    text-sm lg:text-base px-3 py-1.5 lg:px-4 lg:py-2 sm:ml-auto sm:mx-0 mx-auto"
                            data-aos="fade-up"
                            data-aos-anchor="#product"
                            data-aos-anchor-placement="top-center"
                        >
                            立即選購
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-1/3 md:h-124 lg:h-152 xl:h-175 md:mr-6 lg:mr-8 xl:mr-10 hidden md:flex flex-col justify-between">
                <div className="h-1/2 md:mb-5 lg:mb-6 xl:mb-8 rounded-3xl relative cursor-pointer">
                    <Link to="/products">
                        <img
                            src={HomePage12}
                            className="w-full h-full object-cover rounded-3xl"
                            data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000"
                        />
                        <div
                            className="opacity-0 hover:bg-black hover:opacity-50 rounded-3xl absolute w-full
                                h-full top-0 mb-8"
                        >
                            <h3
                                className="text-white absolute top-1/2 left-1/2
                                    transform -translate-y-1/2 -translate-x-1/2 text-2xl lg:text-3xl font-medium"
                            >
                                運動服飾
                            </h3>
                        </div>
                    </Link>
                </div>

                <div
                    className="h-1/2 rounded-3xl relative cursor-pointer"
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000"
                >
                    <Link to="/products">
                        <img
                            src={HomePage11}
                            className="w-full h-full object-cover rounded-3xl"
                        />
                        <div className="opacity-0 hover:bg-black hover:opacity-50 rounded-3xl absolute w-full h-full top-0">
                            <h3
                                className="text-white absolute top-1/2 left-1/2
                                    transform -translate-y-1/2 -translate-x-1/2 text-2xl lg:text-3xl font-medium"
                            >
                                營養補給
                            </h3>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="md:mr-7 lg:mr-9 xl:mr-11 w-1/3 md:h-124 lg:h-152 xl:h-175 hidden md:flex flex-col justify-between">
                <div
                    className="h-1/2 md:mb-5 lg:mb-6 xl:mb-8 rounded-3xl relative cursor-pointer"
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000"
                >
                    <Link to="/products">
                        <img
                            src={HomePage10}
                            className="w-full h-full object-cover rounded-3xl"
                        />
                        <div className="opacity-0 hover:bg-black hover:opacity-50 rounded-3xl absolute w-full h-full top-0 mb-8">
                            <h3
                                className="text-white absolute top-1/2 left-1/2
                                    transform -translate-y-1/2 -translate-x-1/2 text-2xl lg:text-3xl font-medium"
                            >
                                健身器材
                            </h3>
                        </div>
                    </Link>
                </div>

                <div
                    className="h-1/2 rounded-3xl relative cursor-pointer"
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000"
                >
                    <Link to="/products">
                        <img
                            src={HomePage9}
                            className="w-full h-full object-cover rounded-3xl"
                        />
                        <div className="opacity-0 hover:bg-black hover:opacity-50 rounded-3xl absolute w-full h-full top-0">
                            <h3
                                className="text-white absolute top-1/2 left-1/2
                                    transform -translate-y-1/2 -translate-x-1/2 text-2xl lg:text-3xl font-medium"
                            >
                                運動鞋類
                            </h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductSection;
