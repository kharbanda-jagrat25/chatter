import React, { useState } from 'react';

import Messages from '../Messages/Messages';
import apiCaller from '../../apiCaller';
import SpinningLoader from '../SpinningLoader/SpinningLoader';

import styles from './Chatter.module.scss';

const {
    MainContainer,
    Heading,
    Label,
    InputContainer,
    PostBtn,
    DelBtn
} = styles;

export default function Chatter() {
    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState();
    const [messages, setMessages] = useState([]);

    const handleChange = val => setText(val);

    const handleKeyDown = e => {
        if (e.key === 'Enter') postMessage();
    }

    const fetchMessages = async() => {
        try {
            setLoading(true);
            setMessages(await apiCaller({
                url: 'https://mapi.harmoney.dev/api/v1/messages/'
            }));
            setLoading(false);
        }
        catch (err) {
            console.error(err);
        }
    }

    const postMessage = () => {
        if (text) {
            setLoading(true);
            apiCaller({
                url: 'https://mapi.harmoney.dev/api/v1/messages/',
                method: 'post',
                body: {
                    text
                }
            }).then(() => {
                if (!!text) setText('');
                fetchMessages();
            }).catch((err) => {
                alert('Some error occurred!');
                console.error(err);
            }).finally(() => setLoading(false));
        }
    };

    const deleteMessage = ({ event, messageId, callOnSuccess, hasDeletedAll }) => {
        setLoading(true);
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        apiCaller({
            url: `https://mapi.harmoney.dev/api/v1/messages/${messageId}/`,
            method: 'delete'
        }).then(() => {
            if (callOnSuccess) fetchMessages();
        }).catch((err) => {
            alert('Some error occurred!');
            console.error(err);
        }).finally(() => {
            if (callOnSuccess || hasDeletedAll) setLoading(false);
            if (hasDeletedAll) setMessages([]);
        });
    }

    const deleteAllMessages = () => {
        let messagesLength = messages.length;
        for (let message of messages) {
            messagesLength -= 1;
            deleteMessage({ messageId: message.id, hasDeletedAll: messagesLength === 0 });
        }
    }

    return (
        <div className={MainContainer}>
            {isLoading && (
                <SpinningLoader isLoading={isLoading} />
            )}
            <div className={Heading}>Chatter</div>
            <div className={Label}>Type something in the box below, then hit "Post"</div>
            <div className={InputContainer}>
                <input
                    type='text'
                    value={text}
                    onChange={e => handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className={PostBtn} onClick={postMessage}>Post!</button>
                <button className={DelBtn} onClick={deleteAllMessages}>Delete All</button>
            </div>
            <Messages messages={messages} fetchMessages={fetchMessages} deleteMessage={deleteMessage} />
        </div>
    );
}
