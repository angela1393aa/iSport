import { FaImage } from 'react-icons/fa';
import { MdFileUpload } from 'react-icons/md';

const ChatInput = ({ nickname, message, onMessageChange, onMessageEmpty, onSend, img, onSendImg, onImgChange }) => {
    return (
        <div className="flex w-full bg-gray-800 py-4 border-t border-gray-100 border-opacity-30 fixed bottom-0 px-7">
            <label
                htmlFor="messageInput"
                className="flex absolute w-5/6 h-full top-0 -left-4 cursor-text"
            ></label>
            <input
                id="messageInput"
                type="text"
                className="flex w-full h-10 px-2 focus:outline-none bg-gray-800 border-b-4 focus:border-yellow-400 text-white text-lg pb-1.5 mr-7"
                placeholder={`${nickname} 請輸入訊息...`}
                title="請輸入訊息"
                required
                value={message}
                onChange={e => onMessageChange(e)}
                onKeyUp={e => onMessageEmpty(e)}
                onKeyPress={e => e.key === 'Enter' ? onSend(message) : null}
            />
            {img &&
                <div className="absolute bottom-12 right-4 cursor-pointer group">
                    <div
                        className="w-full h-24 absolute z-8"
                        onClick={() => onSendImg()}
                    ></div>
                    <MdFileUpload className="text-white w-12 h-12 absolute z-5 left-1/3 top-1/4 opacity-50 group-hover:opacity-80 transition-all duration-300 ease-in-out group-hover:animate-bounce" />
                    <img src={img} alt="" className="h-24 w-36 object-cover p-1.5 rounded-md bg-white opacity-70 group-hover:opacity-100 group-hover:filter group-hover:blur-sm transition-all duration-300 ease-in-out" />
                </div>}
            <div
                className="self-end group"
            >
                <label
                    htmlFor="messageFile"
                    className="flex absolute h-9 w-9 rounded-full right-6 top-6 cursor-pointer"
                ></label>
                <FaImage className="text-white w-7 h-7 group-hover:text-yellow-400" />
            </div>
            <input
                id="messageFile"
                type="file"
                title="請選取圖片"
                onChange={e => onImgChange(e)}
                className="opacity-0 hidden"
                accept="image/jpeg,image/png,image/jpg,image/gif"
            />
        </div>
    );
};

export default ChatInput;
