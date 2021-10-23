const entryForm = ({ onSubmit, chatRoom }) => {
    return (
        <form
            className="px-7 py-8 flex flex-col w-full h-full pt-24"
            onSubmit={(e) => onSubmit(e)}
        >
            <label
                htmlFor="nickname"
                className="text-white text-xl mb-2"
            >暱稱：</label>
            <input
                id="nickname"
                type="text"
                className="w-full h-10 px-2 focus:outline-none bg-gray-700 border-b-4 focus:border-yellow-400 text-white text-lg mb-6"
                placeholder="請輸入暱稱"
                required
            />
            <label
                htmlFor="room"
                className="text-white text-xl mb-2"
            >選擇聊天室：</label>
            <select
                id="room"
                className="w-full h-10 px-2 focus:outline-none bg-gray-700 border-b-4 focus:border-yellow-400 text-white text-lg mb-36"
                required
            >
                <option value="0" selected disabled hidden>請選擇</option>
                {chatRoom && chatRoom.map(room => (
                    <option value={room.name}>{room.name}</option>
                ))}
            </select>
            <button
                type="submit"
                className="w-full h-12 px-2 focus:outline-none bg-yellow-400 hover:bg-yellow-500 text-black text-xl rounded-md shadow-lg"
            >進入聊天室</button>
        </form>
    );
};

export default entryForm;
