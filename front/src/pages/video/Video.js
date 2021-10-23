import videoHeader from './../../images/有氧/cardio-1.jpg';
import VideoNav from './components/VideoNav';
import VideoList from './components/VideoList';
import useGet from './../../utils/useGet';
import { useState, useRef, useEffect } from 'react';

const Video = () => {
    const { data, error, isPending } = useGet(`/videos`);
    const [category, setCategory] = useState(0);

    const changeCategory = (e) => {
        setCategory(e.target.dataset.id);
    };

    return (
        <>
            <div className="h-44 xs:h-64 sm:h-72 md:h-96 lg:h-112 ">
                <img className="object-cover h-full min-w-full" src={videoHeader} alt="" />
            </div>
            <VideoNav cat={changeCategory} />
            <main className="max-w-screen-xl flex flex-col mx-auto px-2.5 sm:px-5">
                {data && <VideoList videos={data} cat={category} />}
            </main>
        </>
    );
};

export default Video;
