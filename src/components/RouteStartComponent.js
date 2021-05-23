import React from 'react';
import styles from '../common/mainStyles.module.scss'
import {Checkbox, Carousel, Button, Rate, TreeSelect, Input, Slider} from 'antd';

import classNames from "class-names";
import {
    ArrowRightOutlined, CloseOutlined,
    DeleteOutlined,
    DollarCircleOutlined,
    EnvironmentOutlined,
    FieldTimeOutlined,
    PlusCircleOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    SoundOutlined, DollarOutlined,
    HeartOutlined
} from "@ant-design/icons";
import {MainContext} from "../App";
import {useClickAway} from "ahooks";
import metallica from '../static/metallica-nothing_else_matters.mp3'
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import actions from "../redux/actions/user";
import {Link} from "react-router-dom";

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};
const RouteStartComponent = ({
                                 location,
                                 fetchRouteById,
                                 selectRoute,
                                 favorites,
                                 setFavorites,
                                 removeUserFavorites,
                                 createRoute,
                                 pushItemToRoute,
                                 routes
                             }) => {
    let id = Number(location.pathname.slice(12));
    const [popUpRate, setPopRate] = React.useState(false);
    const [popUpAudio, setPopUpAudio] = React.useState(false);
    const [popUpStatus, setPopUpStatus] = React.useState(false);
    const [popUpAddItemStatus, setPopUpAddItemStatus] = React.useState(true);
    const [popStatus, setPopStatus] = React.useState(true);
    const [rate, setRate] = React.useState(0);
    const context = React.useContext(MainContext);
    const popUpRef = React.useRef();
    const popRef = React.useRef();
    const addRouteItemPopUp = React.useRef();
    const addItemBtnRef = React.useRef();
    const btnRef = React.useRef();
    const [favoritesStatus, setFavoriteStatus] = React.useState(0);
    useClickAway(() => {
        setPopRate(false)
        setPopUpAudio(false)
        setPopUpStatus(false)
        setPopUpAddItemStatus(true)
        setPopStatus(true)
        context.toggle.toggle(false);
    }, [popUpRef, addRouteItemPopUp, btnRef, addItemBtnRef, popRef]);
    React.useEffect(() => {
        fetchRouteById(id)
    }, [id, btnRef]);
    let audio = new Audio(metallica);
    return (
        <div className={styles.event}>

            <h1 className={styles.eventHeader}>{selectRoute.name}</h1>
            <div className={styles.eventSlider}>
                <Carousel>
                    {selectRoute?.img?.map((item, index) => {
                        return (
                            <div>
                                <div style={contentStyle}>
                                    <img className={styles.image} src={item}/>
                                </div>
                            </div>
                        )
                    })}


                </Carousel>
            </div>
            <div ref={btnRef} className={styles.eventMark}>
                <a onClick={() => {
                    setPopRate(true);
                    context.toggle.toggle(true)
                    setPopUpStatus(true)
                }}>оценка {rate}</a>
                <div className={styles.eventMarkLeftBar}>

                    <Rate style={{color:'red'}} character={<HeartOutlined />} count={1} onChange={(e) => {
                        !favoritesStatus && setFavorites(selectRoute)
                        favoritesStatus && removeUserFavorites(selectRoute)
                        setFavoriteStatus(e)
                    }} value={favoritesStatus}/>

                    <SoundOutlined onClick={() => {
                        setPopUpAudio(true)
                        setPopUpStatus(true)
                        context.toggle.toggle(true)
                    }} className={styles.icon}/>
                </div>
            </div>
            <div className={styles.routesDescription}>    {selectRoute.description}</div>
            <AddRoutePopUp
                audio={audio}
                popUpStatus={popUpStatus}
                setPopUpStatus={setPopUpStatus}
                setRate={setRate}
                rate={rate} eventName={'event name'}
                context={context}
                popUpAudio={popUpAudio}
                setPopUpAudio={setPopUpAudio}
                ref={popUpRef} popUpRate={popUpRate}
                setPopRate={setPopRate}/>
            <div className={styles.routesTimeEvent}>
                {selectRoute.date}
            </div>
            <div className={styles.eventInfo}>
                <div className={styles.eventInfoItem}>
                    <EnvironmentOutlined className={styles.icon}/>
                    <p>Расстояние: {selectRoute.distance}</p>

                </div>
                <div className={styles.eventInfoItem}>
                    <FieldTimeOutlined className={styles.icon}/>
                    <p>Сеансы: {selectRoute.time}</p>

                </div>
                <div className={styles.eventInfoItem}>
                    <DollarCircleOutlined className={styles.icon}/>
                    <p>Расход: {selectRoute.cost}</p>

                </div>

            </div>

            <div ref={addItemBtnRef} className={styles.eventTools}>
                <Button>Купить билет</Button>
                <Button

                    onClick={() => {
                        context.toggle.toggle(true);

                    }}
                    type={'primary'}>Добавить свой маршрут</Button>
                <Link  to={`/routes/${selectRoute.id}`}>Посмотреть маршрут</Link>

            </div>
            <PopUp
                status={context.toggleStatus}
                ref={popRef}
                item={selectRoute}
                createRoute={createRoute}
                context={context}
                setPopStatus={setPopUpAddItemStatus}/>
            <AddRouteItemPopUp
                ref={addRouteItemPopUp}
                popUpStatus={popUpAddItemStatus}
                setPopStatus={setPopUpAddItemStatus}
                createRoute={createRoute}
                context={context}
                item={selectRoute}
                pushItemToRoute={pushItemToRoute}
                routes={routes}
            />
        </div>
    );
};

const AddRoutePopUp = React.forwardRef((props, ref) => {
        return (
            <div ref={ref} className={
                classNames({
                    [styles.hide]: !props.popUpStatus,
                    [styles.setMarkPopup]: true,
                })}>
                <div className={styles.addRouteBtn}>
                    <div className={styles.setMarkPopupHeader}>
                        <p className={styles.title}>{props.eventName}</p>
                        <Button onClick={() => {
                            props.setPopUpStatus(false)
                            props.setPopRate(false)
                            props.setPopUpAudio(false)
                            props.context.toggle.toggle(false)
                        }} size={"small"} icon={<CloseOutlined/>}/>
                    </div>
                    <p className={styles.title}> {!props.popUpAudio ? 'Ваша оценка:' : 'Плеер'}</p>
                    {props.popUpRate && <Rate value={props.rate} onChange={props.setRate}/>}
                    {props.popUpAudio && <div className={styles.eventPlayer}>
                        <PauseCircleOutlined onClick={() => props.audio.pause()} className={styles.playerIcons}/>
                        <PlayCircleOutlined onClick={() => props.audio.play()} className={styles.playerIcons}/>

                    </div>}

                </div>

            </div>
        )
    }
)


const mapStateToProps = (state) => {
    return {
        selectRoute: state.user.selectRoute,
        favorites: state.user.favorites,
        routes: state.user.routes,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setFavorites: (prop) => dispatch(actions.setUserFavorites(prop)),
        removeUserFavorites: (prop) => dispatch(actions.removeUserFavorites(prop)),
        createRoute: (prop) => dispatch(actions.createRoute(prop)),
        pushItemToRoute: (prop) => dispatch(actions.pushItemToRoute(prop)),
        fetchRouteById: (prop) => dispatch(actions.fetchRouteById(prop)),

    }
}

const PopUp = React.forwardRef((prop, ref) => {
    return (
        <div ref={ref} className={classNames(styles.popup, {[styles.popup_show]: prop?.status})}>
            <div className={styles.popup_content}>
                <h2>{prop.item.name}</h2>
                <div className={styles.horizontalLine}/>

                <p>{prop.item.description}</p>
                <div className={styles.info}>

                    <FieldTimeOutlined className={styles.icon}/>
                    <b>1 час 30 минут</b>
                    <DollarOutlined className={styles.icon}/>
                    <b>Расход 200 Р</b>
                </div>
                <span>
                                    <a className={styles.link} href="#">Подробнее</a>
                    <ArrowRightOutlined className={styles.arrowLink}/>
                </span>
                <div className={styles.popupButtonWrap}>
                    <span>
                        <Button
                            onClick={() => {
                                prop.setPopStatus(false)

                            }}
                            icon={<PlusCircleOutlined/>}>Добавить</Button>
                    </span>

                </div>
            </div>
        </div>
    )
})
const AddRouteItemPopUp = React.forwardRef((props, ref) => {
    const handleChangeCurrentRoute = (e) => {
        props?.pushItemToRoute(e)
    };
    const [newRouteName, setNewRouteName] = React.useState('');
    const {TreeNode} = TreeSelect;
    const {Search} = Input;
    const handleChangeRouteName = (text) => {
        props?.createRoute({
            items: props?.item,
            name: text
        });
        setNewRouteName('')
    }
    return (
        <div ref={ref} className={
            classNames({
                [styles.hide]: props.popUpStatus,
                [styles.addRoutePopUp]: true,
            })}>
            <div className={styles.addRouteBtn}>
                <div className={styles.addRouteHeader}>
                    <p className={styles.title}>Мои маршруты</p>
                    <Button onClick={() => props.setPopStatus(true)} size={"small"} icon={<CloseOutlined/>}/>
                </div>

                <TreeSelect
                    showSearch
                    style={{width: '100%'}}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Выбрать существующий"
                    allowClear
                    treeDefaultExpandAll
                    onChange={handleChangeCurrentRoute}
                >
                    {props.routes.map((item, index) => {
                        return (
                            <TreeNode value={item._id} title={<b style={{color: '#08c'}}>{item.name}</b>}/>
                        )
                    })}
                </TreeSelect>
            </div>
            <Search
                value={newRouteName}
                onSearch={handleChangeRouteName}
                onChange={(e) => {
                    setNewRouteName(e.target.value)
                }}
                placeholder="Имя маршрута"
                enterButton="Добавить"
                size="large"
            />
        </div>
    )
})
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)(RouteStartComponent)

