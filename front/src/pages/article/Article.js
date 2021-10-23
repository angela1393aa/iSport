import React from 'react';
import { Link } from 'react-router-dom';
import ArticleHeader from '../../images/tabata/1.jpeg';
import ArticleNav from './components/ArticleNav';
import ArticleList from './components/ArticleList';
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';
class Article extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-back',
            delay: 100,
        });
    }
    AerobicExercise = [
        {
            category: 'AerobicExercise',
            smTitle: '有氧運動Aerobic exercise',
            bigTitle:
                '心跳率在60～80%，運動起來會喘，但不至於喘到說不出話，可以維持一段時間的運動，常見的有跑步、騎自行車、騎飛輪、游泳等等',
            photo: '1.jpg',
        },
    ];
    WeightTraining = [
        {
            category: 'WeightTraining',
            smTitle: '重量訓練Weight training',
            bigTitle:
                '以增加肌肉強度及體積為目標的力量訓練。使用不同部位骨骼肌組織之收縮（向心收縮或離心收縮）產生之力量，抗衡重力（通常指啞鈴、槓鈴及其他器械之重量或阻力），使肌肉得到鍛鍊。',
            photo: '2.jpg',
        },
    ];
    TABATATraining = [
        {
            category: 'TABATATraining',
            smTitle: '間歇訓練TABATA Training',
            bigTitle:
                '進行「TABATA」間歇訓練必須全力以赴！必須在4分鐘內讓自己到達極限，就算停止運動，身體仍會以為還在持續運動，所以會不斷燃燒卡路里。',
            photo: '3.jpg',
        },
    ];
    CoreStrength = [
        {
            category: 'CoreStrength',
            smTitle: '核心強化Core strength',
            bigTitle:
                '所有運動以及日常生活上的動作都需要靠核心訓練來為我們打基礎。像是：站立、坐直、彎腰取重物等，強化核心的方式有棒式、直腿捲曲、單腳橋式等等',
            photo: '4.jpg',
        },
    ];
    LeanBulking = [
        {
            category: 'LeanBulking',
            smTitle: '增肌飲食Lean Bulking',
            bigTitle:
                '開始訓練後你會發現，最難的不是運動而是吃對食物，鍛鍊前後攝取什麼能提高運動表現、平常該補充哪些營養有助於肌肉合成，這些都是讓增肌減脂更有效的重點。',
            photo: '5.jpg',
        },
    ];
    render() {
        return (
            <>
                <div className="">
                    <img
                        className="object-cover w-full h-44 xs:h-64 sm:h-72 md:h-96 lg:h-112"
                        src={ArticleHeader}
                        alt=""
                    />
                    <div className="top-0 z-40 w-full">
                        <ArticleNav />
                    </div>

                    <main className="bg-gray-800">
                        <article className="w-full md:w-3/4 xs:m-auto">
                            <Link
                                to="/ArticleAerobicExercise"
                                className="flex justify-center lg:justify-end mt-4 "
                                data-aos="fade-left"
                            >
                                <div
                                    className="
                    flex flex-col xl:flex-row
                          bg-gray-900
                          py-8
                          px-4
                          w-4/5
              "
                                >
                                    <ArticleList
                                        ArticleCard={this.AerobicExercise}
                                    />
                                </div>
                            </Link>
                        </article>

                        <article className="w-full md:w-3/4 m-auto">
                            <Link
                                to="/ArticleWeightTraining"
                                className="flex justify-center lg:justify-start mt-4"
                                data-aos="fade-right"
                            >
                                <div
                                    className=" flex flex-col-reverse xl:flex-row
                      bg-gray-900
                      py-8
                      px-4
                      w-4/5
              "
                                >
                                    <ArticleList
                                        ArticleCard={this.WeightTraining}
                                    />
                                </div>
                            </Link>
                        </article>

                        <article className="w-full md:w-3/4 m-auto">
                            <Link
                                to="/ArticleCoreStrength"
                                className="flex justify-center lg:justify-end mt-4"
                                data-aos="fade-left"
                            >
                                <div
                                    className="
                    flex flex-col xl:flex-row
                          bg-gray-900
                          py-8
                          px-4
                          w-4/5
              "
                                >
                                    <ArticleList
                                        ArticleCard={this.CoreStrength}
                                    />
                                </div>
                            </Link>
                        </article>

                        <article className="w-full md:w-3/4 m-auto">
                            <Link
                                to="/ArticleLeanBulking"
                                className="flex justify-center lg:justify-start mt-4"
                                data-aos="fade-right"
                            >
                                <div
                                    className=" flex flex-col-reverse xl:flex-row
                      bg-gray-900
                      py-8
                      px-4
                      w-4/5
              "
                                >
                                    <ArticleList
                                        ArticleCard={this.LeanBulking}
                                    />
                                </div>
                            </Link>
                        </article>

                        <article className="w-full md:w-3/4 m-auto">
                            <Link
                                to="/ArticleTABATATraining"
                                className="flex justify-center lg:justify-end mt-4  mb-4"
                                data-aos="fade-left"
                            >
                                <div
                                    className="
                    flex flex-col xl:flex-row
                          bg-gray-900
                          py-8
                          px-4
                          w-4/5
              "
                                >
                                    <ArticleList
                                        ArticleCard={this.TABATATraining}
                                    />
                                </div>
                            </Link>
                        </article>
                    </main>
                </div>
            </>
        );
    }
}

export default Article;
