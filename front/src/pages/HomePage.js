import React from 'react';
import { useEffect, useState } from 'react';
import ChatRoom from './homeComponents/ChatRoom';
import BannerSection from './homeComponents/BannerSection';
import ProductSection from './homeComponents/ProductSection';
import VideoSection from './homeComponents/VideoSection';
import ArticleSection from './homeComponents/ArticleSection';
import GymSection from './homeComponents/GymSection';
import AOS from 'aos';
import Sport2 from '../images/homepage/2.png';
import '../../node_modules/aos/dist/aos.css';
// const HomePage = () => {
class HomePage extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        AOS.init({
            duration: 500,
            easing: 'ease-out-back',
            delay: 0,
        });
    }
    render() {
        return (
            <div className="max-w-screen-2xl mx-auto">
                {/* Chat room */}
                <div className="fixed z-8 md:block hidden">
                    <ChatRoom />
                </div>

                {/* Banner Section */}
                <div className="max-h-full bg-gray-900">
                    <BannerSection />
                </div>

                {/* Video Section */}
                <section className="h-full flex bg-gray-800 ">
                    <VideoSection />
                </section>

                {/* Product Section */}
                <section
                    className="max-h-full flex bg-gray-900 relative"
                    id="trigger-right"
                >
                    <ProductSection />
                </section>

                {/* Article Section */}
                <section
                    className="max-h-full flex bg-gray-800 relative -top-10"
                    id="trigger-left"
                >
                    <ArticleSection />
                    {/* <img
                        className="absolute z-30 w-1/3 top-20 -right-20 hidden md:block"
                        src={Sport1}
                        alt=""
                        data-aos="fade-left"
                        data-aos-anchor="#trigger-left"
                        data-aos-anchor-placement="top-center"
                    /> */}
                </section>

                {/* Gym Section */}
                <section
                    className="max-h-full flex bg-gray-900  relative"
                    id="trigger"
                >
                    <GymSection />
                    <img
                        className="absolute z-30 w-1/3 top-28 -left-5 hidden md:block"
                        src={Sport2}
                        alt=""
                        data-aos="fade-right"
                        data-aos-anchor="#trigger"
                        data-aos-anchor-placement="top-center"
                    />
                </section>
            </div>
        );
    }
}

export default HomePage;
