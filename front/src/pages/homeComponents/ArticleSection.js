import React, { useState, useEffect } from 'react';
import { BsFillCaretRightFill, BsFillCaretLeftFill } from 'react-icons/bs';
import ArticleOutSide from '../article/components/ArticleOutSide';
import { Link } from 'react-router-dom';
import { API_URL } from '../../utils/config';
import axios from 'axios';
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';
const ArticleSection = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState(null);
    const [Aer, setAer] = useState(null);
    const [Wei, setWei] = useState(null);
    const [Cor, setCor] = useState(null);
    const [Lea, setLea] = useState(null);
    const [TAB, setTAB] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(`${API_URL}/articles/LeanBulking`);
                let data = res.data;
                setData(data);
                setError(null);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);
    console.log(data);
    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(
                    `${API_URL}/articles/AerobicExercise`
                );
                let Aer = res.data;
                setAer(Aer);
                setError(null);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);
    console.log(Aer);
    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(`${API_URL}/articles/WeightTraining`);
                let Wei = res.data;
                setWei(Wei);
                setError(null);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);
    console.log(Wei);
    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(`${API_URL}/articles/CoreStrength`);
                let Cor = res.data;
                setCor(Cor);
                setError(null);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);
    console.log(Cor);
    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(`${API_URL}/articles/LeanBulking`);
                let Lea = res.data;
                setLea(Lea);
                setError(null);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);
    console.log(Lea);
    useEffect(() => {
        const getArticleData = async () => {
            try {
                let res = await axios.get(`${API_URL}/articles/TABATATraining`);
                let TAB = res.data;
                setTAB(TAB);
                setError(null);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getArticleData();
    }, []);
    console.log(TAB);

    const AerobicExercise = (
        <>
            <Link className="flex-1" to="/ArticleOutSide">
                {Aer &&
                    Aer.map((article) => (
                        <ArticleOutSide article={article} key={article.id} />
                    ))}
            </Link>
        </>
    );

    const WeightTraining = (
        <>
            <Link className="flex-1" to="/ArticleOutSide">
                {Wei &&
                    Wei.map((article) => (
                        <ArticleOutSide article={article} key={article.id} />
                    ))}
            </Link>
        </>
    );

    const CoreStrength = (
        <>
            <Link className="flex-1" to="/ArticleOutSide">
                {Cor &&
                    Cor.map((article) => (
                        <ArticleOutSide article={article} key={article.id} />
                    ))}
            </Link>
        </>
    );

    const LeanBulking = (
        <>
            <Link className="flex-1" to="/ArticleOutSide">
                {Lea &&
                    Lea.map((article) => (
                        <ArticleOutSide article={article} key={article.id} />
                    ))}
            </Link>
        </>
    );
    const TABATATraining = (
        <>
            <Link className="flex-1" to="/ArticleOutSide">
                {TAB &&
                    TAB.map((article) => (
                        <ArticleOutSide article={article} key={article.id} />
                    ))}
            </Link>
        </>
    );

    const switchStep = (step) => {
        switch (step) {
            case 1:
                return AerobicExercise;
            case 2:
                return WeightTraining;
            case 3:
                return CoreStrength;
            case 4:
                return LeanBulking;
            case 5:
                return TABATATraining;
            default:
                return AerobicExercise;
        }
    };

    const changeStep = (isAdded = true) => {
        if (isAdded && step < 5) setStep(step + 1);
        if (!isAdded && step > 1) setStep(step - 1);
    };
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: 'ease-out-back',
            delay: 0,
        });
        AOS.refresh();
    }, []);
    return (
        <div className="relative w-full sm:mt-2 lg:mt-2.5 xl:mt-4">
            <div
                className="text-center sm:py-6 mt-7 mb-4"
                data-aos="zoom-in"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="600"
            >
                <span className="text-white text-2xl lg:text-3xl xl:text-4xl border-b-2 sm:border-b-4 border-yellow-400 pb-2.5 sm:pb-3.5">
                    優質文章
                </span>
            </div>
            <p
                className="text-white text-xl md:text-2xl text-center w-full px-4 hidden sm:block"
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="800"
            >
                這裡有豐富強大的健身資料庫，提供您健身資訊、營養菜單...
            </p>
            <div className="object-cover filter brightness-100 h-112 outer-container">
                <div className="mx-auto my-8 sm:my-12 md:my-14 h-full overflow-y-auto w-3/4 outer-container">
                    <div className=" inner-container">{switchStep(step)}</div>
                </div>
            </div>
            {step !== 1 && (
                <button>
                    <BsFillCaretLeftFill
                        className="text-yellow-400 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 absolute
                inset-y-2/3 transform -translate-y-1/2 cursor-pointer hidden 2xs:block"
                        onClick={() => {
                            changeStep(false);
                        }}
                    />
                </button>
            )}
            {step !== 5 && (
                <button>
                    <BsFillCaretRightFill
                        className="text-yellow-400 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 absolute
                inset-y-2/3 right-0 transform -translate-y-1/2 cursor-pointer hidden 2xs:block"
                        onClick={() => {
                            changeStep(true);
                        }}
                    />
                </button>
            )}
        </div>
    );
};

export default ArticleSection;
