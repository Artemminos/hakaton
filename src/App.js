import React from 'react';
import {withRouter} from "react-router";
import {compose} from "redux";
import {connect, useDispatch, useSelector} from 'react-redux';
import styles from './common/mainStyles.module.scss'
import {configResponsive, useLocalStorageState, useResponsive, useToggle} from 'ahooks';
import {Header} from "./components/Header";
import {Content} from "./components/Content";
import {Footer} from "./components/Footer";
import classNames from 'class-names';
import actions from "./redux/actions/user";
import img1 from "./static/jekskursija-v-grajvoron-iz-belgoroda-1.jpg";
import img2 from "./static/jekskursija-v-grajvoron-iz-belgoroda-2.jpg";
import img3 from "./static/jekskursija-v-grajvoron-iz-belgoroda-3.jpg";
import img4 from "./static/jekskursija-v-grajvoron-iz-belgoroda-4.jpg";
import img5 from "./static/jekskursija-v-grajvoron-iz-belgoroda-5.jpg";

export const MainContext = React.createContext({})

configResponsive({
    small: 0,
    middle: 767,
    large: 940,
    extra_large: 1100
});

const App = ({fetchEvents, fetchRoutes}) => {
    let eventDataArray = [

        {
            name: 'Музей',
            time: '60м',
            distance: '10 км',
            cost: '1000 р',
            checked: false,
            description: 'Музей природы Белогорья',
            id: 0,
            img: [img1, img2, img3, img4, img5]
        },
        {
            name: 'Дача',
            time: '60м',
            distance: '10 км',
            cost: '1000 р',
            checked: false,
            description: 'бывшая барская дача «Дьяков сад»;',
            id: 1,
            img: [img1, img2, img3, img4, img5]
        },
        {
            name: 'урочище',
            time: '60м',
            distance: '10 км',
            cost: '1000 р',
            checked: false,
            description: 'урочище «Осиновое» – природная лесостепная дубрава;',
            id: 2,
            img: [img1, img2, img3, img4, img5]
        },
        {
            name: 'сосновый бор',
            time: '60м',
            distance: '10 км',
            cost: '1000 р',
            checked: false,
            description: 'сосновый бор;',
            id: 3,
            img: [img1, img2, img3, img4, img5]
        },
        {
            name: 'меловые обнажения',
            time: '60м',
            distance: '10 км',
            cost: '1000 р',
            checked: false,
            description: 'меловые обнажения – уникальные экосистемы Белгородчины;',
            id: 4,
            img: [img1, img2, img3, img4, img5]
        },
        {
            name: 'родники',
            time: '60м',
            distance: '10 км',
            cost: '1000 р',
            checked: false,
            description: 'родники',
            id: 5,
            img: [img1, img2, img3, img4, img5]
        },

    ]
    let routesDataArray = [
        {
            _id: 0,
            name: 'zero',
            mark:4,
            description:'Описание маршрута',
            image:'',
            items: [
                {
                    name: 'Музей',
                    time: '60м',
                    checked: false,
                    description: 'Музей природы Белогорья',
                    id: 1
                },
                {
                    name: 'Дача',
                    time: '60м',
                    checked: false,
                    description: 'бывшая барская дача «Дьяков сад»;',
                    id: 2
                },
                {
                    name: 'урочище',
                    time: '60м',
                    checked: false,
                    description: 'урочище «Осиновое» – природная лесостепная дубрава;',
                    id: 3
                },
                {
                    name: 'сосновый бор',
                    time: '60м',
                    checked: false,
                    description: 'сосновый бор;',
                    id: 4
                },
                {
                    name: 'меловые обнажения',
                    time: '60м',
                    checked: false,
                    description: 'меловые обнажения – уникальные экосистемы Белгородчины;',
                    id: 5
                },
                {
                    name: 'родники',
                    time: '60м',
                    checked: false,
                    description: 'родники',
                    id: 6
                },
            ]
        },
        {
            _id: 1,
            name: 'first',
            mark:4,
            description:'Описание маршрута',
            image:'',

            items: [
                {
                    name: 'Музей',
                    time: '60м',
                    checked: false,
                    description: 'Музей природы Белогорья',
                    id: 1
                },
                {
                    name: 'Дача',
                    time: '60м',
                    checked: false,
                    description: 'бывшая барская дача «Дьяков сад»;',
                    id: 2
                },
                {
                    name: 'урочище',
                    time: '60м',
                    checked: false,
                    description: 'урочище «Осиновое» – природная лесостепная дубрава;',
                    id: 3
                },
                {
                    name: 'сосновый бор',
                    time: '60м',
                    checked: false,
                    description: 'сосновый бор;',
                    id: 4
                },
                {
                    name: 'меловые обнажения',
                    time: '60м',
                    checked: false,
                    description: 'меловые обнажения – уникальные экосистемы Белгородчины;',
                    id: 5
                },
                {
                    name: 'родники',
                    time: '60м',
                    checked: false,
                    description: 'родники',
                    id: 6
                },
            ]
        },
        {
            _id: 2,
            name: 'two',
            mark:4,
            description:'Описание маршрута',
            image:'',

            items: [
                {
                    name: 'Музей',
                    time: '60м',
                    checked: false,
                    description: 'Музей природы Белогорья',
                    id: 1
                },
                {
                    name: 'Дача',
                    time: '60м',
                    checked: false,
                    description: 'бывшая барская дача «Дьяков сад»;',
                    id: 2
                },
                {
                    name: 'урочище',
                    time: '60м',
                    checked: false,
                    description: 'урочище «Осиновое» – природная лесостепная дубрава;',
                    id: 3
                },
                {
                    name: 'сосновый бор',
                    time: '60м',
                    checked: false,
                    description: 'сосновый бор;',
                    id: 4
                },
                {
                    name: 'меловые обнажения',
                    time: '60м',
                    checked: false,
                    description: 'меловые обнажения – уникальные экосистемы Белгородчины;',
                    id: 5
                },
                {
                    name: 'родники',
                    time: '60м',
                    checked: false,
                    description: 'родники',
                    id: 6
                },
            ]
        },
        {
            _id: 3,
            name: 'three',
            mark:4,
            description:'Описание маршрута',
            image:'',

            items: [
                {
                    name: 'Музей',
                    time: '60м',
                    checked: false,
                    description: 'Музей природы Белогорья',
                    id: 1
                },
                {
                    name: 'Дача',
                    time: '60м',
                    checked: false,
                    description: 'бывшая барская дача «Дьяков сад»;',
                    id: 2
                },
                {
                    name: 'урочище',
                    time: '60м',
                    checked: false,
                    description: 'урочище «Осиновое» – природная лесостепная дубрава;',
                    id: 3
                },
                {
                    name: 'сосновый бор',
                    time: '60м',
                    checked: false,
                    description: 'сосновый бор;',
                    id: 4
                },
                {
                    name: 'меловые обнажения',
                    time: '60м',
                    checked: false,
                    description: 'меловые обнажения – уникальные экосистемы Белгородчины;',
                    id: 5
                },
                {
                    name: 'родники',
                    time: '60м',
                    checked: false,
                    description: 'родники',
                    id: 6
                },
            ]
        },
        {
            _id: 4,
            name: 'forth',
            mark:4,
            description:'Описание маршрута',
            image:'',

            items: [
                {
                    name: 'Музей',
                    time: '60м',
                    checked: false,
                    description: 'Музей природы Белогорья',
                    id: 1
                },
                {
                    name: 'Дача',
                    time: '60м',
                    checked: false,
                    description: 'бывшая барская дача «Дьяков сад»;',
                    id: 2
                },
                {
                    name: 'урочище',
                    time: '60м',
                    checked: false,
                    description: 'урочище «Осиновое» – природная лесостепная дубрава;',
                    id: 3
                },
                {
                    name: 'сосновый бор',
                    time: '60м',
                    checked: false,
                    description: 'сосновый бор;',
                    id: 4
                },
                {
                    name: 'меловые обнажения',
                    time: '60м',
                    checked: false,
                    description: 'меловые обнажения – уникальные экосистемы Белгородчины;',
                    id: 5
                },
                {
                    name: 'родники',
                    time: '60м',
                    checked: false,
                    description: 'родники',
                    id: 6
                },
            ]
        },


    ]
    const [cookie, setCookie] = useLocalStorageState('cookie', false);

    React.useEffect(() => {
        fetchEvents(eventDataArray);
        fetchRoutes(routesDataArray);
    }, [])
    const [toggleStatus, toggle] = useToggle();
    return (
        <MainContext.Provider
            value={{
                toggle: toggle,
                toggleStatus: toggleStatus
            }}>

            <div className={classNames(styles.mask, {[styles.mask_show]: toggleStatus})}/>

            <div className={styles.wrapper}>
                <Header/>
                <Content/>
                <Footer/>
            </div>
        </MainContext.Provider>

    );
};

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchEvents: (data) => dispatch(actions.fetchEvents(data)),
        fetchRoutes: (data) => dispatch(actions.fetchRoutes(data))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)(App)



