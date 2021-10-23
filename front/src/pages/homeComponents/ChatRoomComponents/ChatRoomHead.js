import { IoMdChatboxes } from 'react-icons/io';

const ChatRoomHead = ({ setOpenChat }) => {
    return (
        <div
            className="bg-gray-900 w-full flex py-3 items-center justify-center cursor-pointer fixed z-8"
            onClick={() => setOpenChat(false)}
        >
            <IoMdChatboxes className="text-white w-9 h-9 mr-2" />
            <h3 className="text-white text-2xl">iSport! 即時聊天</h3>
        </div>
    );
};

export default ChatRoomHead;
