import React from 'react';
import {useSwipeable} from "react-swipeable";
import styles from '../common/mainStyles.module.scss'
import classNames from 'class-names'
const Sidebar = () => {
    const handlers = useSwipeable({
      /*  onSwipedLeft: () => {
            sidebarToggle(true)
        },
        onSwipedRight: () => {
            sidebarToggle(false)
        },*/

    });

    return (
        <div  {...handlers} className={classNames(styles.sidebarWrap,{[styles.sidebarShow]:true})}>

                <div  {...handlers} className="sidebar bstu__sidebar">

dasd
                </div>




        </div>
    );
};

export default Sidebar;