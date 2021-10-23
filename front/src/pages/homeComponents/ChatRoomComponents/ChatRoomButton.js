import { IoMdChatboxes } from 'react-icons/io';

const ChatRoomButton = ({ setOpenChat }) => {
    return (
        <button
            type="button"
            className="fixed flex items-center bottom-3 right-3 bg-yellow-400 hover:bg-yellow-500 py-1.5 px-2.5 rounded-md shadow-lg"
            onClick={() => setOpenChat(true)}
        >
            <IoMdChatboxes className="w-8 h-8 mr-2" />
            <h3 className="text-xl">聊天室</h3>
        </button>
    );
};

export default ChatRoomButton;
