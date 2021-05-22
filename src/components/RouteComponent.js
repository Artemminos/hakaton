import React from 'react';
import styles from '../common/mainStyles.module.scss';
import {Steps} from 'antd';
import {withRouter} from "react-router";
import {Button, Tooltip, Popover} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import classNames from 'class-names';
import {MainContext} from "../App";
import {useClickAway, useTitle} from 'ahooks';

const {Step} = Steps;
const RouteComponent = ({location}) => {
    let id = location.pathname.slice(8)
    const [currentStep, setCurrentStep] = React.useState(0);
    const [currentArray, setCurrentArray] = React.useState([]);
    const popUpRef = React.useRef(null);
    const routeRef = React.useRef(null);
    let arr1 = [
        {
            name: 'Музей',
            description: 'Музей природы Белогорья',
            checked: false
        },
        {
            name: 'Дача',
            description: 'бывшая барская дача «Дьяков сад»',
            checked: false
        },
        {
            name: 'урочище',
            description: 'урочище «Осиновое» – природная лесостепная дубрава',
            checked: false
        },
        {
            name: 'сосновый бор',
            description: 'сосновый бор',
            checked: false
        },
        {
            name: 'меловые обнажения',
            description: 'меловые обнажения – уникальные экосистемы Белгородчины',
            checked: false
        },
        {
            name: 'родники',
            description: 'родники',
            checked: false
        },
        {
            name: 'парк',
            description: 'парк «Истоки реки Северский Донец»',
            checked: false
        },
    ];
    let arr2 = [
        {
            name: 'Музей',
            description: 'Музей природы Белогорья',
            checked: false
        },
        {
            name: 'Дача',
            description: 'бывшая барская дача «Дьяков сад»',
            checked: false
        },
        {
            name: 'урочище',
            description: 'урочище «Осиновое» – природная лесостепная дубрава',
            checked: false
        },
        {
            name: 'сосновый бор',
            description: 'сосновый бор',
            checked: false
        },
        {
            name: 'меловые обнажения',
            description: 'меловые обнажения – уникальные экосистемы Белгородчины',
            checked: false
        },
        {
            name: 'родники',
            description: 'родники',
            checked: false
        },
        {
            name: 'парк',
            description: 'парк «Истоки реки Северский Донец»',
            checked: false
        },
    ];
    let arr3 = [
        {
            name: 'Музей',
            description: 'Музей природы Белогорья',
            checked: false
        },
        {
            name: 'Дача',
            description: 'бывшая барская дача «Дьяков сад»',
            checked: false
        },
        {
            name: 'урочище',
            description: 'урочище «Осиновое» – природная лесостепная дубрава',
            checked: false
        },
        {
            name: 'сосновый бор',
            description: 'сосновый бор',
            checked: false
        },
        {
            name: 'меловые обнажения',
            description: 'меловые обнажения – уникальные экосистемы Белгородчины',
            checked: false
        },
        {
            name: 'родники',
            description: 'родники',
            checked: false
        },
        {
            name: 'парк',
            description: 'парк «Истоки реки Северский Донец»',
            checked: false
        },
    ];
    let arr4 = [
        {
            name: 'Музей',
            description: 'Музей природы Белогорья',
            checked: false
        },
        {
            name: 'Дача',
            description: 'бывшая барская дача «Дьяков сад»',
            checked: false
        },
        {
            name: 'урочище',
            description: 'урочище «Осиновое» – природная лесостепная дубрава',
            checked: false
        },
        {
            name: 'сосновый бор',
            description: 'сосновый бор',
            checked: false
        },
        {
            name: 'меловые обнажения',
            description: 'меловые обнажения – уникальные экосистемы Белгородчины',
            checked: false
        },
        {
            name: 'родники',
            description: 'родники',
            checked: false
        },
        {
            name: 'парк',
            description: 'парк «Истоки реки Северский Донец»',
            checked: false
        },
    ];
    React.useEffect(() => {
        switch (id) {
            case '1': {
                return setCurrentArray(arr1)
            }
            case '2': {
                return setCurrentArray(arr2)
            }
            case '3': {
                return setCurrentArray(arr3)
            }
            case'4': {
                return setCurrentArray(arr4)
            }
            default:
                return []
        }
    }, [id])
    const context = React.useContext(MainContext);
    useClickAway(() => {

        context.toggle.toggle(false);
    }, [popUpRef,routeRef]);
    return (
        <div ref={routeRef}  className={styles.route}>

            <Steps direction="vertical" current={currentStep}>
                {currentArray.map((item, index) => {
                    return (
                            <Step
                                key={index}
                                onClick={() => {
                                    setCurrentStep(index);
                                    context.toggle.toggle(true);
                                }}
                                title={item.name}
                                description={item.description}
                            />
                    )
                })}
            </Steps>
            <PopUp ref={popUpRef} status={context.toggleStatus}/>

        </div>
    );
};



const PopUp = React.forwardRef((prop,ref) => {
    return(
        <div ref={ref} className={classNames(styles.popup,{[styles.popup_show]:prop?.status})} >
            <div className={styles.popup_content}>
                popUp

            </div>
        </div>
    )
})


export default withRouter(RouteComponent);