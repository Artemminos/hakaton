import React from 'react';
import styles from '../common/mainStyles.module.scss';
import {Steps, Rate, Input, Space, Button, TreeSelect} from 'antd';
import {withRouter} from "react-router";
import {ArrowRightOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import classNames from 'class-names';
import {MainContext} from "../App";
import {useClickAway, useTitle} from 'ahooks';
import actions from "../redux/actions/user";
import {compose} from "redux";
import {connect} from "beautiful-react-redux";

const {Step} = Steps;
const RouteComponent = ({
                            location,
                            setFavorites,
                            createRoute,
                            favorites,
                            removeUserFavorites,
                            routes,
                            pushItemToRoute
                        }) => {
    let id = Number(location.pathname.slice(8));
    const [popUpStatus, setPopStatus] = React.useState(true);

    const [currentStep, setCurrentStep] = React.useState(0);
    const [currentArray, setCurrentArray] = React.useState({});
    const [currentItem, setCurrentItem] = React.useState('');
    const [favoritesStatus, setFavoriteStatus] = React.useState(0);
    const popUpRef = React.useRef(null);
    const addRouteRef = React.useRef(null);
    const routeRef = React.useRef(null);
    let arr1 = {
        _id: 1,
        name: 'first',
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
    }
    let arr2 = {
        _id: 2,
        name: 'second',
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
    };
    let arr3 = {
        _id: 3,
        name: 'third',
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
    };
    let arr4 = {
        _id: 4,
        name: 'forty',
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
    }

    React.useEffect(() => {
        switch (id) {
            case 1: {
                return setCurrentArray(arr1)
            }
            case 2: {
                return setCurrentArray(arr2)
            }
            case 3: {
                return setCurrentArray(arr3)
            }
            case 4: {
                return setCurrentArray(arr4)
            }
            default:
                return []
        }
    }, [id]);

    const context = React.useContext(MainContext);
    useClickAway(() => {
        setPopStatus(true)
        context.toggle.toggle(false);
    }, [popUpRef, routeRef, addRouteRef]);
    const deleteItemHandler = (item) => {
        let newArr = {
            _id: currentArray._id,
            name: currentArray.name,
            items: currentArray.items.filter((elem) => elem.id !== item)
        }
        setCurrentArray(newArr);
    }

    if (!currentArray.items) return <div/>
    return (
        <div ref={routeRef} className={styles.route}>
            <div className={styles.favorites}>
                <Rate count={1} onChange={(e) => {
                    favoritesStatus && setFavorites(currentArray.items)
                    !favoritesStatus && removeUserFavorites(currentArray.items)
                    setFavoriteStatus(e)
                }} value={favoritesStatus}/>
                <p className={styles.allRouteTime}> 7 Часов</p>
            </div>

            <Steps direction="vertical" current={currentStep}>
                {currentArray.items.map((item, index) => {
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
                deleteItemHandler={deleteItemHandler} item={currentItem}
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
        routes: state.user.routes,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setFavorites: (prop) => dispatch(actions.setUserFavorites(prop)),
        removeUserFavorites: (prop) => dispatch(actions.removeUserFavorites(prop)),
        createRoute: (prop) => dispatch(actions.createRoute(prop)),
        pushItemToRoute: (prop) => dispatch(actions.pushItemToRoute(prop)),

    }
}
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(RouteComponent);