import React, { useEffect } from 'react';
import Message from '../Message/Message';

export default function Messages({ messages, fetchMessages, deleteMessage }) {
    useEffect(() => {
        if (messages.length === 0) fetchMessages();
    }, []);

    return messages?.map(message => (
        <Message key={message.id} message={message} deleteMessage={deleteMessage} />
    ));
}
