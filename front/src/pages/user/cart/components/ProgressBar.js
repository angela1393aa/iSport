import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

function ProgressBar(props) {
    const [currentLocation, setCurrentLocation] = useState(
        props.location.pathname
    );
    return (
        <>
            <div>
                <div className="sm:mx-4 mx-0 p-4">
                    <div className="flex items-center">
                        <button className="rounded-full sm:h-20 sm:w-20 h-16 w-16 sm:py-3 border-2 sm:text-xl border-yellow-400 bg-yellow-400 text-gray-900 cursor-default">
                            確認
                            <br />
                            訂單
                        </button>
                        <div className="flex-auto border-2 transition duration-500 ease-in-out border-yellow-400"></div>
                        <button
                            className={
                                currentLocation === '/checkout2' ||
                                currentLocation === '/finished'
                                    ? 'rounded-full sm:h-20 sm:w-20 h-16 w-16 sm:py-3 border-2 sm:text-xl border-yellow-400 bg-yellow-400 text-gray-900 cursor-default'
                                    : 'rounded-full transition duration-500 ease-in-out sm:h-20 sm:w-20 h-16 w-16 sm:py-3 border-2 border-yellow-400 sm:text-xl text-yellow-400 cursor-default'
                            }
                        >
                            結帳
                        </button>
                        <div className="flex-auto border-2 transition duration-500 ease-in-out border-yellow-400"></div>
                        <button
                            className={
                                currentLocation === '/finished'
                                    ? 'rounded-full h-16 w-16 border-2 sm:h-20 sm:w-20 sm:py-3 sm:text-xl border-yellow-400 bg-yellow-400 text-gray-900 cursor-default'
                                    : 'rounded-full transition duration-500 ease-in-out sm:h-20 sm:w-20 h-16 w-16 sm:py-3 border-2 border-yellow-400 sm:text-xl text-yellow-400 cursor-default'
                            }
                        >
                            完成
                            <br />
                            訂單
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(ProgressBar);
