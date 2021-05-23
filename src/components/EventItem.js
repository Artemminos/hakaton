import React from 'react';
import styles from '../common/mainStyles.module.scss'
import {Rate} from 'antd';

const EventItem = ({text, srcAvatar, alt, description, mark = 4}) => {

    return (
        <div className={styles.eventItemWrapper}>
            <img src={srcAvatar} alt={alt}/>
            <div className={styles.eventItemContent}>
                <p>{text}</p>
                <p style={{marginTop: '25px'}}>Оценка {mark} </p>
            </div>
        </div>
    );
};


export default EventItem;
