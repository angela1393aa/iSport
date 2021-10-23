import { useState, useEffect } from 'react';
import { TiLocation } from 'react-icons/ti';
import Map from './../../images/map/map.png';
import GymList from './GymList';
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';
function GymSection() {
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: 'ease-out-back',
            delay: 0,
        });
        AOS.refresh();
    }, []);
    const EasthGyms = [
        {
            name: '花蓮縣立體育館',
            phone: '',
            image: 'https://i.imgur.com/QaNO9mx.jpg',
            address: '970花蓮縣花蓮市達固湖彎大路23號',
            latitude: '24.05630148193927',
            longitude: '121.56319266647677',
        },
        {
            name: '花蓮縣中正體育場',
            phone: '(03)834-6035',
            image: 'https://i.imgur.com/FYDUCpO.jpg',
            address: '970花蓮縣花蓮市公園路53號',
            latitude: '23.983809852601006',
            longitude: '121.6154482648243',
        },
        {
            name: '臺東縣立體育場',
            phone: '(08)931-0194',
            image: 'https://i.imgur.com/1j5uLaq.jpg',
            address: '950台東縣台東市桂林北路52巷120號',
            latitude: '22.79812840874506',
            longitude: '121.154642430138',
        },
        {
            name: '花蓮縣中正體育場',
            phone: '(03)834-6035',
            image: 'https://i.imgur.com/FYDUCpO.jpg',
            address: '970花蓮縣花蓮市公園路53號',
            latitude: '23.983809852601006',
            longitude: '121.6154482648243',
        },
    ];
    const MidthGyms = [
        {
            name: '台南一中體育館',
            phone: '(06)209-7177',
            image: 'https://i.imgur.com/1j5uLaq.jpg',
            address: '701台南市東區',
            latitude: '23.008468446226853',
            longitude: '120.21561861576318',
        },
        {
            name: '臺南市立新營體育場',
            phone: '(06)656-2104',
            image: 'https://i.imgur.com/DY3dgw5.jpg',
            address: '730台南市新營區長榮路二段78號',
            latitude: '23.337133357352414',
            longitude: '120.31012058035297',
        },
        {
            name: '北港鎮立體育館',
            phone: '(05)778-8321',
            image: 'https://i.imgur.com/kxZE8gf.jpg',
            address: '651雲林縣北港鎮',
            latitude: '23.599655816274197',
            longitude: '120.31025024442027',
        },
        {
            name: '嘉義縣立體育館',
            phone: '(05)370-8101',
            image: 'https://i.imgur.com/tKLqhsW.jpg',
            address: '613嘉義縣朴子市四維路一段460號',
            latitude: '23.485088205242167',
            longitude: '120.24433227672894',
        },
    ];
    const NorthGyms = [
        {
            name: '臺北體育館',
            phone: '(02)2570-2330',
            image: 'https://i.imgur.com/i1jEQPF.jpg',
            address: '105台北市松山區南京東路四段10號',
            latitude: '25.051422618669456',
            longitude: '121.55210445503499',
        },
        {
            name: '桃園巨蛋體育館',
            phone: '(03)319-4510',
            image: 'https://i.imgur.com/QaNO9mx.jpg',
            address: '330桃園市桃園區三民路一段1號',
            latitude: '24.995298701673114',
            longitude: '121.32294371509067',
        },
        {
            name: '新竹市立體育館',
            phone: '(03)562-1138',
            image: 'https://i.imgur.com/kxZE8gf.jpg',
            address: '300新竹市東區公園路295號',
            latitude: '24.802119438741403',
            longitude: '120.97933025403563',
        },
        {
            name: '基隆市立體育館',
            phone: '(02)2427-5518',
            image: 'https://i.imgur.com/1j5uLaq.jpg',
            address: '201基隆市信義區信二路40-1號2樓',
            latitude: '25.13111517939692',
            longitude: '121.75669757060912',
        },
    ];
    const SouthGyms = [
        {
            name: '高雄鳳山運動中心',
            phone: '(07)790-2288',
            image: 'https://i.imgur.com/DY3dgw5.jpg',
            address: '830高雄市鳳山區光華路68號',
            latitude: '22.626029100180858',
            longitude: '120.35393548581638',
        },
        {
            name: '青少年體育活動中心',
            phone: '(08)736-258',
            image: 'https://i.imgur.com/1j5uLaq.jpg',
            address: '812高雄市小港區學府路115號',
            latitude: '22.56646349031065',
            longitude: '120.35895019887515',
        },
        {
            name: '屏東國民運動中心',
            phone: '(08)737-1388',
            image: 'https://i.imgur.com/i1jEQPF.jpg',
            address: '900屏東縣屏東市勝利東路50號',
            latitude: '22.67760067648531',
            longitude: '120.49853954149451',
        },
        {
            name: '屏東縣立體育館',
            phone: '(08)736-2589',
            image: 'https://i.imgur.com/tKLqhsW.jpg',
            address: '900屏東縣屏東市勝利路9號',
            latitude: '22.677719470805414',
            longitude: '120.49388490101751',
        },
    ];
    let [gym, setGym] = useState(NorthGyms);
    const changeNorthGym = () => {
        setGym(NorthGyms);
    };
    const changeMidthGym = () => {
        setGym(MidthGyms);
    };
    const changeSouthGym = () => {
        setGym(SouthGyms);
    };
    const changeEasthGym = () => {
        setGym(EasthGyms);
    };

    return (
        <div className="md:flex md:justify-center w-full mt-7 mb-10 sm:mx-auto sm:mt-14 lg:mt-16 xl:mt-20">
            <div className="relative p-32 object-contain mr-32 hidden md:block">
                <img className="absolute top-8 left-16" src={Map} alt="" />
                <TiLocation
                    className="z-0 text-yellow-300 hover:text-yellow-400 w-24 h-24 absolute top-14 left-48 transform -translate-y-1/2 cursor-pointer animate-bounce"
                    onClick={changeNorthGym}
                />
                <TiLocation
                    className="z-0 text-yellow-300 hover:text-yellow-400 w-24 h-24 absolute top-64 left-48 transform -translate-y-1/2 cursor-pointer animate-bounce"
                    onClick={changeEasthGym}
                />
                <TiLocation
                    className="z-0 text-yellow-300 hover:text-yellow-400 w-24 h-24 absolute top-80 left-24 transform -translate-y-1/2 cursor-pointer animate-bounce"
                    onClick={changeSouthGym}
                />
                <TiLocation
                    className="z-0 text-yellow-300 hover:text-yellow-400 w-24 h-24 absolute top-40 left-26 transform -translate-y-1/2 cursor-pointer animate-bounce"
                    onClick={changeMidthGym}
                />
            </div>
            <div className="" id="gym">
                <h3
                    class="w-max text-white text-2xl lg:text-3xl xl:text-4xl border-b-2 sm:border-b-4 border-yellow-400
                    pb-2.5 sm:pb-3.5 flex mx-auto mb-4 sm:mb-6 lg:mb-8 xl:mb-10"
                    data-aos="fade-up"
                    data-aos-anchor="#gym"
                    data-aos-anchor-placement="top-center"
                    id="example-anchor"
                >
                    健身房
                </h3>
                <div className="flex justify-center text-2xl text-white text-center md:hidden">
                    <div
                        className="w-1/4 bg-gray-700 hover:bg-gray-800 py-2"
                        onClick={changeNorthGym}
                    >
                        北
                    </div>
                    <div
                        className="w-1/4 bg-gray-700 hover:bg-gray-800 py-2"
                        onClick={changeMidthGym}
                    >
                        中
                    </div>
                    <div
                        className="w-1/4 bg-gray-700 hover:bg-gray-800 py-2"
                        onClick={changeSouthGym}
                    >
                        南
                    </div>
                    <div
                        className="w-1/4 bg-gray-700 hover:bg-gray-800 py-2"
                        onClick={changeEasthGym}
                    >
                        東
                    </div>
                </div>
                <div
                    data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration="500"
                >
                    <GymList Gyms={gym} />
                </div>
            </div>
        </div>
    );
}

export default GymSection;
