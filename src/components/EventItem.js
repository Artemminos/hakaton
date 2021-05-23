import React from 'react';
import styles from '../common/mainStyles.module.scss'
import { Rate } from 'antd';

const EventItem = ({text, srcAvatar, alt, description, mark}) => {

    return (
        <div className={styles.eventItemWrapper}>
            <img src={srcAvatar} alt={alt}/>
            <div className={styles.eventItemContent}>
                <p>{text}</p>
                <p>{description}</p>
                <Rate count={5} defaultValue={mark} />
            </div>
        </div>
    );
};


export default EventItem;
