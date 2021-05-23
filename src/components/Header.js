import React from "react";
import styles from '../common/mainStyles.module.scss';
import {ShareAltOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Logo from "../static/logo 1.png";

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header_logo}>
                <img src={Logo} alt="logo"/>
                <span>Коф<b style={{color:'#E91824'}}>е</b>рансье</span>
            </div>
            <div className={styles.header_tools}>
                <Link to={'/profile'}>
                    <UserOutlined className={styles.header_icon}/>
                </Link>
            </div>
        </div>
    )
}