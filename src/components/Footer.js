import React from "react";
import styles from '../common/mainStyles.module.scss'
import {Link} from "react-router-dom";
import {HomeOutlined,SearchOutlined,MenuOutlined} from '@ant-design/icons';

export const Footer = () => {
    return (

        <div className={styles.footer_wrapper}>
            <div>
                <Link  to={'/'}>
                    <HomeOutlined  className={styles.nav_bar_icon}/>
                </Link>
            </div>
            <div >
                <Link to={'/search'}>
                    <SearchOutlined className={styles.nav_bar_icon}/>
                </Link>
            </div>
            <div >
                <Link to={'/routes/1'}>
                    <MenuOutlined className={styles.nav_bar_icon}/>
                </Link>
            </div>
        </div>
    )
}
