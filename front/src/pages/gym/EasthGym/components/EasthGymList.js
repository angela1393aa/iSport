import React from 'react';
import GymItem from './EasthGymItem';

function GymList(props) {
    const { Gyms } = props;
    const { pData2, setPData2 } = props;
    return (
        <div className="col-md-8 cart">
            {Gyms.map((gym, index) => (
                <GymItem
                    key={index}
                    phone={gym.phone}
                    name={gym.name}
                    image={gym.image}
                    address={gym.address}
                    latitude={gym.latitude}
                    longitude={gym.longitude}
                    setPData2={setPData2}
                />
            ))}
        </div>
    );
}

export default GymList;
