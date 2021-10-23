import UserAside from '../components/UserAside';
import { useAuth } from '../../../context/auth';
import NotAuth from '../components/NotAuth';
import useGet from '../../../utils/useGet';
import VideoCollectionList from './components/VideoCollectionList';

const VideoCollection = () => {
    const { member } = useAuth();
    const { data: collectedVideos, error, isPending } = useGet(`/users/videoCollection`);

    console.log(collectedVideos);
    return (
        <>
            {member ? (
                <main className="max-w-screen-xl mx-auto px-2.5 py-5 flex justify-start">
                    <UserAside />
                    <article className="w-full">
                        <div className="bg-gray-700 pl-5 py-5 text-white text-opacity-85 text-3xl rounded-t-xl font-bold">
                            收藏影片
                        </div>
                        <div className="text-white bg-gray-900 w-full px-20 pb-6 flex flex-col rounded-b-xl min-h-screen items-start">
                            {collectedVideos && collectedVideos.length > 0 ?
                                <VideoCollectionList collectedVideos={collectedVideos} />
                                : <h4 className="mt-20 font-bold text-2xl flex mx-auto">目前還沒有已收藏的影片</h4>}
                        </div>
                    </article>
                </main>
            ) : (
                <NotAuth />
            )}
        </>
    );
};

export default VideoCollection;
