import { useState, useEffect } from 'react';
import { FaComments } from "react-icons/fa";
import axios from 'axios';
import { API_URL } from './../../utils/config';
import { useAuth } from '../../../context/auth';
import Comment from './Comment';
import Person2 from './../../../images/person-2.jpg';

const CommentSection = ({ videoId, allComment, setAllComment, onDelete, onEdit, currentEdit }) => {
    const { member, setMember } = useAuth();
    const [showSubmit, setShowSubmit] = useState(false);
    const [comment, setComment] = useState('');
    const [editValue, setEditValue] = useState('');

    const submitComment = (e) => {
        setShowSubmit(false);
        e.preventDefault();
        if (comment !== '') {
            (async function () {
                let res = await axios.post(`${API_URL}/videos/${videoId}/comments`, {
                    comment: comment.replace(/<[^>]+>/g, '')
                }
                    , { withCredentials: true });
                setAllComment(res.data);
            })();
        }
        setComment('');
    };

    const handleCancelComment = () => {
        setShowSubmit(false);
        setComment('');
    };

    const submitEditComment = () => {
        if (editValue !== '') {
            let commentId = allComment[currentEdit].id;
            (async function () {
                let res = await axios.put(`${API_URL}/videos/${videoId}/comments/${commentId}`, {
                    newComment: editValue.replace(/<[^>]+>/g, '')
                }
                    , { withCredentials: true });
                setAllComment(res.data);
            })();
        }
    };

    return (
        <div className="lg:col-span-2 lg:row-span-2 col-span-full mb-5 xs:mx-0">
            {member ? <>
                <div className="flex items-center mb-7">
                    <FaComments className="text-yellow-400 mr-2.5 text-lg hidden xs:block" />
                    <span className="text-sm font-medium xs:font-normal xs:text-base text-white mr-4">{allComment && allComment.length + " 則留言"}</span>
                </div>
                <div className="flex mb-7">
                    <img
                        className="w-12 h-12 rounded-full mr-4"
                        src={Person2}
                    />
                    <form
                        className="flex flex-col w-full"
                        onSubmit={(e) => submitComment(e)}>
                        {showSubmit ? <>
                            <textarea
                                className="commentInput pb-1.5 placeholder-white text-base text-white border-b border-gray-400 bg-gray-800
                                self-start w-full focus:outline-none focus:placeholder-gray-400 focus:border-white mb-2 h-12"
                                placeholder="新增留言"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <div className="flex justify-end">
                                <button
                                    className="btn-gray-sm mr-3"
                                    type="button"
                                    onClick={() => handleCancelComment()}>取消</button>
                                <button
                                    className="btn-yellow-sm"
                                    type="submit"
                                >留言</button>
                            </div>
                        </> :
                            <textarea
                                className="commentInput pb-1.5 placeholder-white text-base text-white border-b border-gray-400 bg-gray-800
                                self-start w-full focus:outline-none focus:placeholder-gray-400 focus:border-white mb-2 h-8"
                                placeholder="新增留言"
                                value={comment}
                                onFocus={() => setShowSubmit(true)}
                            ></textarea>}
                    </form>
                </div>
            </> : <div className="flex items-center mb-7">
                <FaComments className="text-yellow-400 mr-2.5 text-lg hidden xs:block" />
                <span className="text-sm font-medium xs:font-normal xs:text-base text-white mr-4">{allComment && allComment.length + " 則留言"}</span>
            </div>}

            {allComment &&
                <Comment
                    comments={allComment}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    currentEdit={currentEdit}
                    onSubmit={submitEditComment}
                    editValue={editValue}
                    setEditValue={setEditValue}
                />}
        </div>
    );
};

export default CommentSection;
