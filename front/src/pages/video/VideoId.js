import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useGet from './../../utils/useGet';
import { APP_URL, API_URL, REACT_APP_CLOUDINARY } from './../../utils/config';
import { Video, Transformation } from 'cloudinary-react';
import { useAuth } from '../../context/auth';
import DeleteModal from './components/DeleteModal';
import SuggestVideoCol from './components/SuggestVideoCol';
import SuggestArtCol from './components/SuggestArtCol';
import CommentSection from './components/CommentSection';

import { FaClock } from 'react-icons/fa';

import {
    RiShareForwardLine,
    RiShareForwardFill,
    RiThumbUpLine,
    RiThumbUpFill,
    RiHeartFill,
    RiHeartLine,
} from 'react-icons/ri';

const VideoId = ({ signInWindow, setSignInWindow }) => {
    const { videoId } = useParams();
    const location = useLocation();
    const { member, setMember } = useAuth();

    let { data: video, error, isPending } = useGet(`/videos/${videoId}`);

    const [liked, setLiked] = useState(false);
    const [ILiked, setILiked] = useState(false);
    const [copiedAlert, setCopiedAlert] = useState(false);
    const [collect, setCollect] = useState(false);
    const [allComment, setAllComment] = useState([]);
    const [currentEdit, setCurrentEdit] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        if (video) {
            let LikedOrNot = video.wasLiked;
            setILiked(LikedOrNot);
            setLiked(LikedOrNot);
            let CollectedOrNot = video.wasCollected;
            setCollect(CollectedOrNot);
            setAllComment(video.comment);
        }
    }, [video]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCopiedAlert(false);
        }, 2000);
        return () => clearInterval(timeout);
    }, [copiedAlert]);

    const handleDislike = () => {
        setLiked(false);
        if (member) {
            (async function () {
                await axios.patch(
                    `${API_URL}/videos/${videoId}`,
                    { like: 'dislike' },
                    { withCredentials: true }
                );
            })();
        }
    };

    const handleLike = () => {
        member ? setLiked(true) : setSignInWindow(true);
        if (member) {
            (async function () {
                await axios.patch(
                    `${API_URL}/videos/${videoId}`,
                    { like: 'like' },
                    { withCredentials: true }
                );
            })();
        }
    };

    const handleRemoveCollection = () => {
        setCollect(false);
        if (member) {
            (async function () {
                await axios.patch(
                    `${API_URL}/videos/${videoId}`,
                    { collect: 'removeCollection' },
                    { withCredentials: true }
                );
            })();
        }
    };

    const handleAddCollection = () => {
        member ? setCollect(true) : setSignInWindow(true);
        if (member) {
            (async function () {
                await axios.patch(
                    `${API_URL}/videos/${videoId}`,
                    { collect: 'addCollection' },
                    { withCredentials: true }
                );
            })();
        }
    };

    const handleDeleteButton = () => {
        setDeleteModal(true);
    };

    const cancelDelete = () => {
        setDeleteModal(false);
    };

    const handleDelete = () => {
        let commentId = allComment[currentEdit].id;
        (async function () {
            let res = await axios.delete(
                `${API_URL}/videos/${videoId}/comments/${commentId}`,
                { withCredentials: true }
            );
            setAllComment(res.data);
        })();
    };

    return (
        <>
            {deleteModal && (
                <DeleteModal onCancel={cancelDelete} onDelete={handleDelete} />
            )}
            <div className="max-w-screen-2xl mx-auto xs:p-6 grid grid-cols-3 gap-x-10 lg:grid-rows-3 gap-y-6 items-start">
                {/* Video Main Section */}
                {video && (
                    <div className="lg:col-span-2 lg:row-span-1 col-span-full z-0">
                        <Video
                            cloudName={REACT_APP_CLOUDINARY}
                            id="doc-player"
                            className="cld-video-player cld-fluid max-h-124"
                            secure="true"
                            publicId={`iSport_Videos/${video.filePath.slice(
                                15,
                                28
                            )}`}
                            sourceType={['mp4']}
                            width="100%"
                            controls
                            controlsList="nodownload"
                            muted
                        >
                            <Transformation height="176" videoSampling="5" />
                        </Video>
                        <h1 className="text-white text-xl mt-4 mx-5 xs:mx-0">
                            {video.title}
                        </h1>

                        <div
                            className="my-3 pb-2 border-b-2 border-yellow-400 flex
                    sm:justify-between justify-center mx-5 xs:mx-0"
                        >
                            <div className="sm:flex items-center hidden">
                                <h4 className="text-sm text-white mr-4 w-max">
                                    觀看次數：{video.views}次
                                </h4>
                                <FaClock className="text-yellow-400 mr-1" />
                                <span className="text-xs text-white w-max">
                                    {video.upload_date
                                        .slice(0, 10)
                                        .replace(/-/gi, ' / ')}
                                </span>
                            </div>
                            <div className="flex w-full justify-between sm:justify-end">
                                {liked ? (
                                    <div
                                        className="flex mr-4 items-center cursor-pointer"
                                        onClick={() => handleDislike()}
                                    >
                                        <RiThumbUpFill className="text-yellow-400 mr-1 sm:text-lg xs:text-3xl" />
                                        <span className="text-sm sm:text-xs text-white w-max">
                                            {ILiked
                                                ? video.likes
                                                : video.likes + 1}
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="flex mr-4 items-center cursor-pointer"
                                        onClick={() => handleLike()}
                                    >
                                        <RiThumbUpLine className="text-yellow-400 mr-1 sm:text-lg xs:text-3xl" />
                                        <span className="text-sm sm:text-xs text-white w-max">
                                            {ILiked
                                                ? video.likes - 1
                                                : video.likes}
                                        </span>
                                    </div>
                                )}

                                {copiedAlert ? (
                                    <div className="flex mr-4 items-center cursor-pointer">
                                        <RiShareForwardFill className="text-yellow-400 mr-1 sm:text-lg xs:text-3xl" />
                                        <span className="text-sm sm:text-xs text-white w-max">
                                            已複製連結
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="flex mr-4 items-center cursor-pointer"
                                        onClick={() => {
                                            setCopiedAlert(true);
                                            navigator.clipboard.writeText(
                                                APP_URL + location.pathname
                                            );
                                        }}
                                    >
                                        <RiShareForwardLine className="text-yellow-400 mr-1 sm:text-lg xs:text-3xl" />
                                        <span className="text-sm sm:text-xs text-white w-max">
                                            點擊分享
                                        </span>
                                    </div>
                                )}

                                {collect ? (
                                    <div
                                        className="flex mr-4 items-center cursor-pointer"
                                        onClick={() => handleRemoveCollection()}
                                    >
                                        <RiHeartFill className="text-red-400 mr-1 sm:text-base xs:text-2xl" />
                                        <span className="text-sm sm:text-xs text-white w-max">
                                            已收藏
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="flex mr-4 items-center cursor-pointer"
                                        onClick={() => handleAddCollection()}
                                    >
                                        <RiHeartLine className="text-red-400 mr-1 sm:text-base xs:text-2xl" />
                                        <span className="text-sm sm:text-xs text-white w-max">
                                            收藏
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <h3 className="text-white text-lg mt-2.5 mb-2 font-bold mx-5 xs:mx-0">
                            影片簡介
                        </h3>
                        <p
                            className="text-white text-base ml-8 mx-5 xs:mr-14 sm:mr-20 md:mr-28"
                            dangerouslySetInnerHTML={{
                                __html: video.description,
                            }}
                        ></p>
                        <div
                            className="mt-3 xs:my-3 pb-2 border-b-2 border-yellow-400 flex
                        justify-center mx-5 xs:mx-0"
                        ></div>
                    </div>
                )}

                {/* Suggestion Section */}
                <div className="lg:col-span-1 lg:row-span-2 col-span-full mx-5 xs:mx-0">
                    <div className="mt-0 border-b-2 pb-5 border-yellow-400 lg:border-b-0 lg:pb-0">
                        <h3 className="text-xl text-white lg:pb-2 lg:border-b-2 lg:border-yellow-400 ">
                            推薦影片
                        </h3>
                        <SuggestVideoCol />
                    </div>
                    <div className="mt-6 hidden lg:block">
                        <h3 className="text-xl text-white pb-2 border-b-2 border-yellow-400">
                            推薦文章
                        </h3>
                        <SuggestArtCol />
                    </div>
                </div>

                {/* Comment Section */}
                <CommentSection
                    videoId={videoId}
                    allComment={allComment}
                    setAllComment={setAllComment}
                    onDelete={handleDeleteButton}
                    onEdit={setCurrentEdit}
                    currentEdit={currentEdit}
                />
            </div>
        </>
    );
};

export default VideoId;
