import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './config';

const useGet = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getVideoData() {
            try {
                let res = await axios.get(API_URL + url, {
                    withCredentials: true
                });

                setData(res.data);
                setIsPending(false);
                setError(null);

            } catch (e) {
                setError(e.message);
                setIsPending(false);

            }
        }
        getVideoData();
    }, [url]);

    return {
        data,
        isPending,
        error
    };
};

export default useGet;
