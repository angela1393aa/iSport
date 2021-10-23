import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import ChatRoomHead from './ChatRoomComponents/ChatRoomHead';
import EntryForm from './ChatRoomComponents/EntryForm';
import RoomInfoBar from './ChatRoomComponents/RoomInfoBar';
import Messages from './ChatRoomComponents/Messages';
import ChatInput from './ChatRoomComponents/ChatInput';
import ChatRoomButton from './ChatRoomComponents/ChatRoomButton';
import useGet from './../../utils/useGet';
import { API_URL } from './../../utils/config';

let socket;

const ChatRoom = () => {
    const history = useHistory();
    const location = useLocation();

    let { data: chatRooms, error, isPending } = useGet('/homepage/chatRoom');

    const [chatRoom, setChatRoom] = useState([]);
    const [openChat, setOpenChat] = useState(false);
    const [closeForm, setCloseForm] = useState(false);
    const [nickname, setNickname] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [seeMember, setSeeMember] = useState(false);
    const [img, setImg] = useState(null);
    const [imgToUpload, setImgToUpload] = useState(null);
    const [imgMessage, setImgMessage] = useState([]);

    useEffect(() => {
        setChatRoom(chatRooms);

    }, [chatRooms]);

    useEffect(() => {
        const { nickname, room } = queryString.parse(location.search);

        if (nickname !== undefined && room !== undefined) {
            setNickname(nickname);
            setRoom(room);

            socket = io(API_URL.slice(0, 21));

            socket.emit('join', { nickname, room }, err => {
                if (err) {
                    return alert(err);
                }
                setCloseForm(true);
            });

            return () => {
                socket.emit();
            };
        }

    }, [location.search]);

    useEffect(() => {
        if (socket) {
            socket.on('userTyping', typingUsers => {
                console.log(typingUsers);
                typingUsers && typingUsers > 0 ? setTypingUsers(`${typingUsers}人正在輸入訊息...`) : setTypingUsers(null);
            });
            socket.on('message', message => {
                setMessages(messages => [...messages, message]);
            });
            socket.on('image', image => {
                setMessages(messages => [...messages, image]);
            });
            socket.on('roomData', ({ users }) => {
                setUsers(users);
                if (users.length === 1) setSeeMember(false);
            });
        }

    }, [socket]);

    const handleEnterChatRoom = (e) => {
        e.preventDefault();
        const nickname = e.target.nickname.value;
        const room = e.target.room.value;
        history.push(`?nickname=${nickname}&room=${room}`);
    };

    const handleChatInput = (e) => {
        setMessage(e.target.value);
        if (socket) socket.emit('isTyping');
    };

    const handleEmpty = (e) => {
        if (socket && e.target.value === '') {
            socket.emit('cancelTyping');
            typingUsers && typingUsers > 0 ? setTypingUsers(`${typingUsers}人正在輸入訊息...`) : setTypingUsers(null);
        }
    };

    const sendMessage = () => {
        if (socket && message !== '') {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    const leaveChatRoom = () => {
        history.push('/');
        if (socket) socket.disconnect();
        setCloseForm(false);
        setMessages([]);
        setMessage('');
        setSeeMember(false);
    };

    const handleSendImg = () => {
        if (socket) socket.emit('sendImg', imgToUpload, () => {
            setImgToUpload(null);
            setImg(null);
        });
    };

    const handleImg = (e) => {
        // setImgToUpload(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("loadend", () => {
            setImg(reader.result);
            setImgToUpload(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <>
            {openChat && <div className="w-96 h-124 bg-gray-700 fixed bottom-0 right-3 rounded-md shadow-lg overflow-hidden border border-gray-100 border-opacity-10 filter drop-shadow-lg z-8">
                <ChatRoomHead setOpenChat={setOpenChat} />
                {!closeForm && <EntryForm onSubmit={handleEnterChatRoom} chatRoom={chatRoom} />}
                {closeForm &&
                    <>
                        {<RoomInfoBar seeMember={seeMember} setSeeMember={setSeeMember} nickname={nickname} room={room} users={users} onLeave={leaveChatRoom} />}
                        <div
                            className="flex flex-col w-full"
                        >
                            <Messages messages={messages} nickname={nickname} typingUsers={typingUsers} />
                            <ChatInput nickname={nickname} message={message} onMessageChange={handleChatInput} onMessageEmpty={handleEmpty} onSend={sendMessage} img={img} onSendImg={handleSendImg} onImgChange={handleImg} />
                        </div>
                    </>}
            </div>};
            <ChatRoomButton setOpenChat={setOpenChat} />
        </>
    );
};

export default ChatRoom;