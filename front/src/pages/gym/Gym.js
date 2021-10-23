import React, { useState } from 'react';
import ArticleHeader from '../../images/11.jpeg';
import NorthGym from './NorthGym/NorthGym';
import MidthGym from './MidthGym/MidthGym';
import SouthGym from './SouthGym/SouthGym';
import EasthGym from './EasthGym/EasthGym';
import GymMap from './GymMap';
function Gym() {
    const [pData2, setPData2] = useState('');
    let [gym, setGym] = useState(<NorthGym setPData2={setPData2} />);
    const changeNorthGym = () => {
        setGym(<NorthGym setPData2={setPData2} />);
    };
    const changeMidthGym = () => {
        setGym(<MidthGym setPData2={setPData2} />);
    };
    const changeSouthGym = () => {
        setGym(<SouthGym setPData2={setPData2} />);
    };
    const changeEasthGym = () => {
        setGym(<EasthGym setPData2={setPData2} />);
    };
    return (
        <>
            <div>
                <img
                    className="object-cover w-full h-44 xs:h-64 sm:h-72 md:h-96 lg:h-112"
                    src={ArticleHeader}
                    alt=""
                />
            </div>
            <div className="flex justify-center">
                <div className="w-1/2 p-4 hidden md:block z-0">
                    <div></div>
                    <GymMap
                        lat={pData2 && +pData2.latitude}
                        lng={pData2 && +pData2.longitude}
                        name={pData2 && pData2.name}
                        image={pData2 && pData2.image}
                        address={pData2 && pData2.address}
                    />
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <h3 class="text-4xl text-white text-center m-6">健身房</h3>
                    <div className="flex justify-center text-2xl text-white text-center">
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
                    <div>{gym}</div>
                </div>
            </div>
        </>
    );
}

export default Gym;
