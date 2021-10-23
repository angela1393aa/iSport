import React from 'react';
import EasthGymList from './components/EasthGymList';

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
        name: '花蓮縣立中正體育場',
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
];
function EasthGym(props) {
    const { pData2, setPData2 } = props;
    return (
        <>
            <div>
                <EasthGymList Gyms={EasthGyms} setPData2={setPData2} />
            </div>
        </>
    );
}

export default EasthGym;
