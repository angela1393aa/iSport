import React from 'react';
import NorthGymList from './components/NorthGymList';

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
function NorthGym(props) {
    const { pData2, setPData2 } = props;
    return (
        <>
            <div>
                <NorthGymList Gyms={NorthGyms} setPData2={setPData2} />
            </div>
        </>
    );
}

export default NorthGym;
