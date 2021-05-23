import React from 'react';
import styles from '../common/mainStyles.module.scss'

const EventItem = ({text, srcAvatar, alt,description}) => {
    return (
        <div className={styles.eventItemWrapper}>
            <img src={srcAvatar} alt={alt}/>
            <p>{text}</p>
            <p>{description}</p>


        </div>
    );
};

export default EventItem;