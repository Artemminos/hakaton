import React from "react";
import styles from '../common/mainStyles.module.scss';
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.navLink}>
                <Link to={'/'}>
                    Главная
                </Link>
            </div>
            <div className={styles.navLink}>
                <Link to={'/routes'}>
                    Маршруты
                </Link>
            </div>
            <div className={styles.navLink}>
                <Link to={'/routes'}>
                    Маршруты
                </Link>
            </div>
        </div>
    )
}