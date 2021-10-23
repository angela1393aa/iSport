import {
    Image,
    Video,
    Transformation,
    CloudinaryContext,
} from 'cloudinary-react';
import { FaClock } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { REACT_APP_CLOUDINARY } from '../../../utils/config';

const VideoCard = ({ video }) => {
    let file = 'iSport_Videos/' + video.filePath.slice(15, 28);
    return (
        <Link to={'/video/' + video.id} className="max-w-max m-auto">
            <div
                className="max-w-xs min-w-full h-100 rounded-md overflow-hidden shadow-2xl bg-gray-900
                py-4 px-5 flex flex-col"
            >
                <Video
                    cloudName={REACT_APP_CLOUDINARY}
                    secure="true"
                    publicId={file}
                    className="h-44 object-cover"
                    sourceType={['jpg']}
                >
                    <Transformation height="176" width="300" />
                </Video>
                <div className="">
                    <h3 className="text-base text-yellow-400 mt-4 mb-1.5 h-12 line-clamp-2 overflow-hidden">
                        {video.title}
                    </h3>
                    <p
                        className="text-white text-sm text-opacity-70 leading-relaxed mb-6
                        line-clamp-3 overflow-hidden h-16"
                        dangerouslySetInnerHTML={{ __html: video.description }}
                    ></p>
                </div>
                <div className="flex justify-between">
                    <h6 className="flex items-center">
                        <FaClock className="text-yellow-400 mr-1.5" />
                        <span className="text-xs text-white text-opacity-85">
                            {video.duration}
                        </span>
                    </h6>
                    <h6 className="flex items-center">
                        <FaEye className="text-yellow-400 mr-1.5" />
                        <span className="text-xs text-white text-opacity-85">
                            {video.views}
                        </span>
                    </h6>
                    <h6 className="flex items-center">
                        <FaThumbsUp className="text-yellow-400 mr-1.5" />
                        <span className="text-xs text-white text-opacity-85">
                            {video.likes}
                        </span>
                    </h6>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
