import { IoPeople, IoPerson } from 'react-icons/io5';

const RoomInfoBar = ({ seeMember, setSeeMember, nickname, room, users, onLeave }) => {
    return (
        seeMember ? <div
            className="flex flex-col bg-gray-600 pl-7 pr-5 pb-1.5 border-b border-gray-100 border-opacity-10 pt-16 cursor-pointer"
            onClick={() => setSeeMember(!seeMember)}
        >
            <div className="flex items-end w-full mb-2">
                <IoPeople className="text-white w-9 h-9 mr-3" />
                <h4 className="text-white text-lg">
                    {room} 聊天室
                                <span> ({`${users.length} 人`})</span>
                </h4>
                <button
                    className="bg-gray-700 hover:bg-gray-800 rounded py-0.5 px-2.5 flex text-white ml-auto mb-0.5"
                    onClick={() => onLeave()}
                >退出</button>
            </div>
            {users.length > 1 && users.map(user => (
                user.nickname === nickname ? null :
                    <div className="flex items-center mb-0.5 bg-gray-400 text-black px-4 py-1 rounded-sm">
                        <IoPerson className="w-6 h-6 mr-1.5" />
                        <p>{user.nickname}</p>
                    </div>
            ))}
        </div> :
            <div
                className="flex bg-gray-600 items-end pl-7 pb-1.5 border-b border-gray-100 border-opacity-10 pt-16 cursor-pointer"
                onClick={() => users.length > 1 && setSeeMember(!seeMember)}
            >
                <IoPeople className="text-white w-9 h-9 mr-3" />
                <h4 className="text-white text-lg">
                    {room} 聊天室
                                <span> ({`${users.length} 人`})</span>
                </h4>
                <button
                    className="bg-gray-700 hover:bg-gray-800 rounded py-0.5 px-2.5 flex text-white mr-5 ml-auto mb-0.5"
                    onClick={() => onLeave()}
                >退出</button>
            </div>
    );
};

export default RoomInfoBar;
