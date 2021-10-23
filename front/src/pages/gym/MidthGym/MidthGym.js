import React from 'react';
import MidthGymList from './components/MidthGymList';

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
function MidthGym(props) {
    const { pData2, setPData2 } = props;
    return (
        <>
            <div>
                <MidthGymList Gyms={MidthGyms} setPData2={setPData2} />
            </div>
        </>
    );
}

export default MidthGym;
