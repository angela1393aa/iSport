import HomePage1 from './../../images/homepage/homepage-1.jpg';
import HomePage2 from './../../images/homepage/homepage-2.jpg';
import HomePage3 from './../../images/homepage/homepage-3.jpg';
import HomePage4 from './../../images/homepage/homepage-4.jpg';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';
const BannerSection = () => {
    const imageData = [
        {
            id: 1,
            imageSource: HomePage1,
        },
        {
            id: 2,
            imageSource: HomePage2,
        },
        {
            id: 3,
            imageSource: HomePage3,
        },
        {
            id: 4,
            imageSource: HomePage4,
        },
    ];

    const [img, setImg] = useState(imageData);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = imageData.length - 1;
        if (index < 0) {
            setIndex(lastIndex);
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, img]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1);
        }, 4000);
        return () => {
            clearInterval(slider);
        };
    }, [index]);
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: 'ease-out-back',
            delay: 0,
        });
        AOS.refresh();
    }, []);
    return (
        <div className="relative h-full w-full">
            <div className="relative h-72 2xs:h-80 xs:h-96 sm:h-112 md:h-124 lg:h-136 xl:h-175 w-full overflow-hidden">
                {imageData.map((image, imageIndex) => {
                    const { id, imageSource } = image;
                    let position =
                        'h-full w-full object-cover absolute top-0 transition duration-200 ease-in-out transform translate-x-full z-0';

                    if (imageIndex === index) {
                        position =
                            'h-full w-full object-cover absolute top-0 transition duration-200 ease-in-out z-5';
                    }
                    if (
                        imageIndex === index - 1 ||
                        (index === 0 && imageIndex === imageData.length - 1)
                    ) {
                        position =
                            'h-full w-full object-cover absolute top-0 transition duration-200 ease-in-out transform -translate-x-full z-0';
                    }

                    return (
                        <img key={id} src={imageSource} className={position} />
                    );
                })}
                <BsFillCaretLeftFill
                    className="text-yellow-400 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 absolute
                        inset-y-1/2 transform -translate-y-1/2 cursor-pointer hidden 2xs:block z-6"
                    onClick={() => setIndex(index - 1)}
                />

                <BsFillCaretRightFill
                    className="text-yellow-400 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 absolute
                        inset-y-1/2 right-0 transform -translate-y-1/2 cursor-pointer hidden 2xs:block z-6"
                    onClick={() => setIndex(index + 1)}
                />
            </div>
            <div
                className="absolute bottom-16 left-16 xs:bottom-20 xs:left-20 sm:bottom-24 sm:left-24
                    md:bottom-32 md:left-32 lg:bottom-40 lg:left-40 z-6"
                id="banner"
            >
                <h1
                    className="font-normal text-xl xs:text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white
                        tracking-wide leading-snug mb-3 sm:mb-4 hidden 2xs:block z-5"
                    data-aos="fade-up"
                    data-aos-anchor="#banner"
                    data-aos-anchor-placement="top-center"
                >
                    提供健身資訊分享平台與眾多
                    <br />
                    專業健身影片、文章分享、商城。
                </h1>
                <Link to="/SignUp">
                    <button
                        className="text-gray-800 bg-yellow-400 border border-solid border-yellow-400 uppercase
                            rounded-full outline-none ease-linear transition-all duration-150 hidden 2xs:block
                            hover:bg-yellow-500 hover:border-yellow-500 active:bg-yellow-500
                            text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2"
                        data-aos="fade-up"
                        data-aos-anchor="#banner"
                        data-aos-anchor-placement="top-center"
                    >
                        立即加入
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BannerSection;
