import useGet from '../../../utils/useGet';
import { useState } from 'react';

const VideoNav = ({ cat }) => {
    const { data: categories, error, isPending } = useGet(`/videos/category`);
    const [selected, setSelected] = useState(0);

    const setCat = (e) => {
        cat(e);
        setSelected(parseInt(e.target.dataset.id));
    };

    const selectedClass =
        'border-b-2 border-yellow-400 w-36 text-yellow-400 text-center text-sm sm:text-base py-5 2xs:px-0 px-2.5 min-w-min cursor-pointer';

    const unselectedClass =
        'border-b-2 border-transparent w-36 text-white text-center text-sm sm:text-base py-5 2xs:px-0 px-2.5 min-w-min cursor-pointer hover:border-yellow-400 hover:text-yellow-400';

    return (
        <>
            { categories &&
                <nav className="bg-gray-900 flex justify-center">
                    <div
                        className={selected === 0 ? selectedClass : unselectedClass}
                        onClick={e => setCat(e)}
                        data-id="0"
                    >
                        所有影片
                    </div>
                    {categories.map(category => (
                        <div
                            className={selected === category.id ? selectedClass : unselectedClass}
                            key={category.id}
                            data-id={category.id}
                            onClick={e => setCat(e)}
                        >
                            {category.name}
                        </div>
                    ))}
                </nav>}
        </>
    );
};

export default VideoNav;
