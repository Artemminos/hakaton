import React from "react";
import styles from '../common/mainStyles.module.scss'
import {Link} from "react-router-dom";
import {HomeOutlined,SketchOutlined,SearchOutlined,MenuOutlined} from '@ant-design/icons';
import {withRouter} from "react-router";

 const Footer = ({location}) => {
     let pathname = location.pathname;


     return (

        <div className={styles.footer_wrapper}>
            <div>
                <Link  to={'/home'}>
                    <HomeOutlined style={{color:pathname.includes('/home')&&'orange'}} className={styles.nav_bar_icon}/>
                </Link>
            </div>
            <div >
                <Link to={'/routesList'}>
                    <SketchOutlined style={{color:pathname.includes('/routesList')&&'orange'}} className={styles.nav_bar_icon}/>
                </Link>
            </div>
            <div >
                <Link to={'/sidebar'}>
                    <MenuOutlined style={{color:pathname.includes('/sidebar')&&'orange'}} className={styles.nav_bar_icon}/>
                </Link>
            </div>
        </div>
    )
}
export default withRouter(Footer)