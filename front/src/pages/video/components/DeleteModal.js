const DeleteModal = ({ onCancel, onDelete }) => {

    return (
        <div
            className="h-screen w-full fixed z-5 bg-black bg-opacity-30"
            onClick={() => onCancel()}
        >
            <div className="flex flex-col bg-gray-700 w-96 h-44 rounded-md shadow-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-3/4">
                <h4 className="text-white font-medium text-xl bg-gray-900 px-5 py-4 rounded-t-md">確定要刪除留言嗎？</h4>
                <p className="text-white text-base pl-5 py-4">刪除留言後無法復原。</p>
                <div className="flex self-end mt-auto pr-5 pb-4">
                    <button
                        className="btn-gray-sm-dark mr-2"
                        onClick={() => onCancel()}
                    >取消</button>
                    <button
                        className="btn-yellow-sm"
                        onClick={() => onDelete()}
                    >確定</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
