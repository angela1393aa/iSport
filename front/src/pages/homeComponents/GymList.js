import React from 'react';
import GymSectionItem from './GymSectionItem';

function GymList(props) {
    const { Gyms } = props;
    return (
        <div>
            {Gyms.map((gym, index) => (
                <GymSectionItem
                    key={index}
                    phone={gym.phone}
                    name={gym.name}
                    image={gym.image}
                    address={gym.address}
                />
            ))}
        </div>
    );
}

export default GymList;
