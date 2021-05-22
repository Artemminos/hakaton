import {Routes} from "./Routes";
import React from "react";
import styles from '../common/mainStyles.module.scss'

export const Content = () => {
    return (
        <div className={styles.content}>
            <Routes/>
        </div>
    )
}