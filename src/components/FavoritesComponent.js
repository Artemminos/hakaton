import React from 'react';
import styles from '../common/mainStyles.module.scss';
import {Steps, Rate, Input, Space, Button, TreeSelect} from 'antd';
import {withRouter} from "react-router";
import {
    ArrowRightOutlined,
    DeleteOutlined,
    DollarOutlined,
    CloseOutlined,
    FieldTimeOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import classNames from 'class-names';
import {MainContext} from "../App";
import {useClickAway, useTitle} from 'ahooks';
import actions from "../redux/actions/user";
import {compose} from "redux";
import {connect} from "beautiful-react-redux";

const {Step} = Steps;
const FavoritesComponent = ({
                                location,
                                setFavorites,
                                createRoute,
                                removeUserFavorites,
                                routes,

                                pushItemToRoute,
                                getFavoritesById,
                                deleteRouteItem,
                                selectFavorites
                            }) => {
    let id = Number(location.pathname.slice(11));
    const [popUpStatus, setPopStatus] = React.useState(true);
    const [currentStep, setCurrentStep] = React.useState(0);
    const [currentItem, setCurrentItem] = React.useState('');
    const [favoritesStatus, setFavoriteStatus] = React.useState(0);
    const popUpRef = React.useRef(null);
    const addRouteRef = React.useRef(null);
    const routeRef = React.useRef(null);

    const context = React.useContext(MainContext);

    React.useEffect(() => {
        getFavoritesById(id)
    }, [id, location])

    useClickAway(() => {
        setPopStatus(true)
        context.toggle.toggle(false);
    }, [popUpRef, routeRef, addRouteRef]);


    if (!selectFavorites?.data?.items) return <div/>
    return (
        <div ref={routeRef} className={styles.route}>
            <div className={styles.favorites}>
                <Rate count={1} onChange={(e) => {
                    !favoritesStatus && setFavorites(selectFavorites)
                    favoritesStatus && removeUserFavorites(selectFavorites)
                    setFavoriteStatus(e)
                }} value={favoritesStatus}/>
                <p className={styles.allRouteTime}> 7 Часов</p>
            </div>

            <Steps direction="vertical" current={currentStep}>
                {selectFavorites.data.items.map((item, index) => {
                    return (
                        <Step
                            key={index}
                            onClick={() => {
                                setCurrentStep(index);
                                setCurrentItem(item);
                                context.toggle.toggle(true);

                            }}
                            title={item.name}
                            description={item.time}
                        />
                    )
                })}
            </Steps>

            <AddRoutePopUp
                setPopStatus={setPopStatus}
                createRoute={createRoute}
                item={currentItem}
                pushItemToRoute={pushItemToRoute}
                ref={addRouteRef} popUpStatus={popUpStatus} routes={routes}/>
            <PopUp
                setPopStatus={setPopStatus}
                createRoute={createRoute} context={context}
                deleteItemHandler={deleteRouteItem} item={currentItem}
                ref={popUpRef}
                status={context.toggleStatus}/>
        </div>
    );
};


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
                    <span style={{marginLeft: '10px'}}>
                        <Button
                            onClick={() => {
                                prop?.deleteItemHandler(prop?.item.id);
                                prop?.context.toggle.toggle(false);
                            }}
                            icon={<DeleteOutlined/>}>Удалить</Button>
                    </span>
                </div>
            </div>
        </div>
    )
})

const AddRoutePopUp = React.forwardRef((props, ref) => {
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

const mapStateToProps = (state) => {
    return {
        favorites: state.user.favorites,
        currentArray: state.user.selectRoute,
        routes: state.user.routes,
        selectFavorites: state.user.selectFavorites,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFavorites: (prop) => dispatch(actions.setUserFavorites(prop)),
        removeUserFavorites: (prop) => dispatch(actions.removeUserFavorites(prop)),
        createRoute: (prop) => dispatch(actions.createRoute(prop)),
        pushItemToRoute: (prop) => dispatch(actions.pushItemToRoute(prop)),
        fetchRouteById: (prop) => dispatch(actions.fetchRouteById(prop)),
        getFavoritesById: (prop) => dispatch(actions.getFavoritesById(prop)),
        deleteRouteItem: (prop) => dispatch(actions.deleteFavoriteItem(prop)),

    }
}
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(FavoritesComponent);