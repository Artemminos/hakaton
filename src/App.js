import React from 'react';
import {withRouter} from "react-router";
import {compose} from "redux";
import {Routes} from "./components/Routes";
import {useDispatch, useSelector} from 'react-redux';
import {YMaps, Map, RoutePanel, Button} from 'react-yandex-maps';
import styles from './common/mainStyles.module.scss'
import {configResponsive, useLocalStorageState, useResponsive, useToggle} from 'ahooks';
import {Header} from "./components/Header";
import {Content} from "./components/Content";
import {Footer} from "./components/Footer";
import classNames from 'class-names';
export const MainContext = React.createContext({})

configResponsive({
    small: 0,
    middle: 767,
    large: 940,
    extra_large: 1100
});

const App = () => {

    const responsive = useResponsive();
    const [cookie, setCookie] = useLocalStorageState('cookie', false);
    const dispatch = useDispatch();
    //  const isAuth = useSelector();
// https://react-yandex-maps.vercel.app/controls/route-panel
    //https://www.npmjs.com/package/ymaps-list
//https://yandex.ru/dev/maps/jsbox/2.1/multiroute_driving
   /* function script(url) {
        if (Array.isArray(url)) {
            let self = this;
            let prom = [];
            url.forEach(function (item) {
                prom.push(self.script(item));
            });
            return Promise.all(prom);
        }

        return new Promise(function (resolve, reject) {
            let r = false;
            let t = document.getElementsByTagName('script')[0];
            let s = document.createElement('script');

            s.type = 'text/javascript';
            s.src = url;
            s.async = true;
            s.onload = s.onreadystatechange = function () {
                if (!r && (!this.readyState || this.readyState === 'complete')) {
                    r = true;
                    resolve(this);
                }
            };
            s.onerror = s.onabort = reject;
            t.parentNode.insertBefore(s, t);
        });
    }

    script('//api-maps.yandex.ru/2.1/?apikey=106b8cb7-1a46-4beb-9671-03da8c4f3a61&lang=ru_RU').then(() => {
    });
    console.log(global.ymaps)*/
    const [toggleStatus, toggle] = useToggle();
    return (
        <MainContext.Provider
            value={{
                toggle:toggle,
                toggleStatus:toggleStatus
            }}>

            <div className={classNames(styles.mask,{[styles.mask_show]:toggleStatus})}/>

            <div className={styles.wrapper}>
                <Header/>
                <Content/>
                <Footer/>
            </div>
        </MainContext.Provider>

    );
};

export default withRouter(App)



