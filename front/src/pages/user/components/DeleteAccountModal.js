import { useState, useEffect } from 'react';

const DeleteAccountModal = ({ onDelete, onCancel, memberName }) => {
    const [deleteWord, setDeleteWord] = useState('');
    const [deleteInput, setDeleteInput] = useState('');
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setDeleteWord(`刪除帳號：${memberName}`);
    }, [memberName]);

    const handleDelete = (e) => {
        e.preventDefault();
        if (deleteInput === deleteWord) {
            onDelete();
        } else {
            setAlert(true);
        }
    };

    return (
        <div
            className="h-screen w-full fixed z-5 bg-black bg-opacity-30"
        >
            <div
                className="h-screen w-full fixed z-0"
                onClick={() => onCancel()}
            ></div>
            <div className="flex flex-col bg-gray-700 w-112 h-76 rounded-lg shadow-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-3/4">
                <h4 className="text-red-700 font-bold text-2xl bg-gray-900 px-5 py-4 rounded-t-lg">確定要刪除帳號？</h4>
                <h6 className="text-white text-lg mx-5 mt-4 mb-2.5">刪除帳號後將無法還原，若確定要刪除輸入""內的文字：</h6>
                <p className="text-white text-lg px-5 mb-2">{`"${deleteWord}"`}</p>
                <form
                    className="flex flex-col"
                    onSubmit={(e) => handleDelete(e)}
                >
                    <input
                        type="text"
                        className={alert ? "text-white bg-gray-700 border-b-2 focus:outline-none border-red-700 text-lg mx-5 px-1.5 py-1"
                            : "text-white bg-gray-700 border-b-2 border-white focus:outline-none focus:border-yellow-400 text-lg mx-5 mb-4 px-1.5 py-1"}
                        required
                        value={deleteInput}
                        onChange={(e) => setDeleteInput(e.target.value)}
                    />
                    {alert && <p className="mx-5 text-red-600 font-bold">輸入錯誤</p>}
                    <div className="flex self-end pr-5 pb-4">
                        <button
                            className="btn-gray-sm-dark mr-2"
                            type="button"
                            onClick={() => onCancel()}
                        >取消</button>
                        <button
                            className="btn-yellow-sm"
                            type="submit"
                        >確定</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
