import React, { useState, useEffect } from 'react';

function ProductTypeValue(props) {
    const { valueId, typeValue, typeNameBack, currentSku, setCurrentSku } =
        props;
    const [checkTypeValue, setCheckTypeValue] = useState(false);
    const handleCurrentSku = () => {
        let data = { ...currentSku, [typeNameBack]: valueId };
        setCurrentSku(data);
    };

    useEffect(() => {
        let isValue = currentSku[typeNameBack] === valueId ? true : false;
        setCheckTypeValue(isValue);
    }, [currentSku]);

    return (
        <>
            {checkTypeValue ? (
                <div
                    onClick={handleCurrentSku}
                    className="px-3 py-0 rounded-full bg-yellow-400 text-gray-900 cursor-pointer"
                >
                    {typeValue}
                </div>
            ) : (
                <div
                    onClick={handleCurrentSku}
                    className="px-3 py-0 rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 hover:border-transparent cursor-pointer"
                >
                    {typeValue}
                </div>
            )}
        </>
    );
}

export default ProductTypeValue;
