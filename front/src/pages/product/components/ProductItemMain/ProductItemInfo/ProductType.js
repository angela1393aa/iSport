import React, { useState, useEffect } from 'react';
import ProductTypeValue from './ProductTypeValue';

function ProductType(props) {
    const { typeName, typeValue, typeNameBack, currentSku, setCurrentSku } =
        props;
    return (
        <>
            <div className="py-1 flex items-start">
                {typeName}：
                <div className="grid grid-cols-3 gap-2">
                    {typeValue &&
                        typeValue.map((item) => {
                            return (
                                <ProductTypeValue
                                    key={item.id}
                                    valueId={item.id}
                                    typeValue={item.type_value}
                                    typeNameBack={typeNameBack}
                                    currentSku={currentSku}
                                    setCurrentSku={setCurrentSku}
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default ProductType;
