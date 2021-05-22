import React from "react";
import styles from '../common/mainStyles.module.scss';
import {ShareAltOutlined,UserOutlined} from '@ant-design/icons';

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header_logo}>Logo</div>
            <div className={styles.header_tools}>
                <UserOutlined className={styles.header_icon} />
            </div>
        </div>
    )
}