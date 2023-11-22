import React from 'react';
import moment from 'moment';

import styles from './Message.module.scss';

const {
    MainContainer,
    SenderContainer,
    Sender,
    Time,
    Text
} = styles;

export default function Message({ message, deleteMessage }) {
    return (
        <div className={MainContainer}>
            <div className={SenderContainer}>
                <span>💬</span>
                <span className={Sender}>~{message.source}</span>
                <span className={Time}>- {moment(message.timestamp).local().format('hh:mm:ss a')}</span>
                <a href='#' onClick={event => deleteMessage({ event, messageId: message.id, callOnSuccess: true })}>Delete</a>
            </div>
            <div className={Text}>{message.text}</div>
        </div>
    );
}
