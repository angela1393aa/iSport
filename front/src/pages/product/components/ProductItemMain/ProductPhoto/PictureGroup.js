import React, { useState, useEffect } from 'react';

function PictureGroup(props) {
    const { imgName, id, setBigImg, bigImg } = props;
    // console.log(imgName);
    const photoUrl = require('../../../../../images/product/' + imgName);
    return (
        <>
            <figure
                onClick={(e) => {
                    setBigImg(e.target.name);
                }}
                name={imgName}
                className="mb-2 mr-2 xl:mr-0 lx:mb-2 w-20 h-20 xl:w-28 xl:h-28 rounded-md overflow-hidden flex-shrink-0"
            >
                <img
                    src={photoUrl.default}
                    alt={imgName}
                    name={imgName}
                    className="w-full h-full object-cover object-center"
                />
            </figure>
        </>
    );
}

export default PictureGroup;
