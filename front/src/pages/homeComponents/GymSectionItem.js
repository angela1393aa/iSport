import React from 'react';
function GymSectionItem(props) {
    const { phone, name, image, address } = props;
    return (
        <div className="flex items-center my-2">
            <img className="h-24" src={image} alt="" />
            <div className="text-white mx-3 w-52">
                <h5 className="text-2xl">{name}</h5>
                <p className="">
                    {phone} <br />
                    {address}
                    <br />
                </p>
            </div>
        </div>
    );
}

export default GymSectionItem;
