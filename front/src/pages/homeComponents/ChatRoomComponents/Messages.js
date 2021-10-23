import { useRef, useEffect } from 'react';

const Messages = ({ messages, nickname, typingUsers }) => {
    const currentSpeak = useRef('iSport!');
    const speakChange = useRef(true);

    useEffect(() => {
        document.querySelector('.end').scrollIntoView({ behavior: 'smooth' });

    }, [messages]);

    return (
        <div
            className="w-full h-80 flex flex-col pl-7 pr-4 pt-4 pb-1.5 overflow-x-hidden overflow-y-scroll"
        >
            {messages && messages.map((message, idx) => {
                if (message.user !== currentSpeak.current) {
                    currentSpeak.current = message.user;
                    speakChange.current = true;
                } else {
                    speakChange.current = false;
                }

                return (
                    message.user === nickname ? (
                        <div className="flex mb-2 ml-auto">
                            <p className="text-gray-400 text-xs self-end mr-1">{message.time}</p>
                            {message.text ?
                                <div
                                    className="max-w-64 min-w-min py-2 px-4 bg-gray-500 rounded flex flex-shrink-0 break-all shadow-md chat"
                                    key={idx}
                                >
                                    <p>{message.text}</p>
                                </div>
                                : <img src={message.img} alt="" className="h-24 w-36 object-cover p-1.5 rounded-md bg-white opacity-70" />}
                        </div>
                    ) : (
                        <div className="flex mb-2">
                            <div>
                                {(speakChange.current || idx === 0) ? <h5 className="text-gray-300 text-sm">{message.user}</h5> : null}
                                {message.text ?
                                    <div
                                        className="max-w-64 min-w-min py-2 px-4 text-white bg-gray-800 rounded flex flex-shrink-0 mr-auto break-all shadow-md"
                                        key={idx}
                                    >
                                        <p>{message.text}</p>

                                    </div> :
                                    <img src={message.img} alt="" className="h-24 w-36 object-cover p-1.5 rounded-md bg-white opacity-70" />}
                            </div>
                            <p className="ml-1 self-end text-gray-400 text-xs">{message.time}</p>
                        </div>
                    )
                );
            })}
            {typingUsers && <p className="flex mt-auto mb-1.5 text-white">{typingUsers}</p>}
            <div className="end" />
        </div>
    );
};

export default Messages;
