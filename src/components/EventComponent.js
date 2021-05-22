import React from 'react';
import styles from '../common/mainStyles.module.scss'
import {Checkbox, Carousel, Button, Rate, TreeSelect, Input, Slider} from 'antd';

import img1 from "../static/jekskursija-v-grajvoron-iz-belgoroda-1.jpg";
import img2 from "../static/jekskursija-v-grajvoron-iz-belgoroda-2.jpg";
import img3 from "../static/jekskursija-v-grajvoron-iz-belgoroda-3.jpg";
import img4 from "../static/jekskursija-v-grajvoron-iz-belgoroda-4.jpg";
import img5 from "../static/jekskursija-v-grajvoron-iz-belgoroda-5.jpg";
import classNames from "class-names";
import {
    ArrowRightOutlined, CloseOutlined,
    DeleteOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    FieldTimeOutlined,
    PlusCircleOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    SoundOutlined
} from "@ant-design/icons";
import {MainContext} from "../App";
import {useClickAway} from "ahooks";
import metallica from '../static/metallica-nothing_else_matters.mp3'

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};

const EventComponent = () => {
    const [popUpRate, setPopRate] = React.useState(false);
    const [popUpAudio, setPopUpAudio] = React.useState(false);
    const [popUpStatus, setPopUpStatus] = React.useState(false);
    const [rate, setRate] = React.useState(0);
    const context = React.useContext(MainContext);
    const popUpRef = React.useRef();
    const btnRef = React.useRef();
    useClickAway(() => {
        setPopRate(false)
        setPopUpAudio(false)
        setPopUpStatus(false)
        context.toggle.toggle(false);
    }, [popUpRef, btnRef]);
    let arr = [
        {
            src: img1,
            alt: 'Замок'
        }
        , {
            src: img2,
            alt: 'Круглое здание'
        }
        , {
            src: img3,
            alt: 'холл'
        }, {
            src: img4,
            alt: 'гуси гуси га га га '
        }, {
            src: img5,
            alt: 'гуси гуси га га га '
        },
    ]

    let audio = new Audio(metallica);
    return (
        <div className={styles.event}>

            <h1 className={styles.eventHeader}>event name</h1>
            <div className={styles.eventSlider}>
                <Carousel>
                    {arr.map((item, index) => {
                        return (
                            <div>
                                <div style={contentStyle}>
                                    <img className={styles.image} src={item.src} alt={item.alt}/>
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
                <SoundOutlined onClick={() => {
                    setPopUpAudio(true)
                    setPopUpStatus(true)
                    context.toggle.toggle(true)
                }} className={styles.icon}/>
            </div>
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
            <div className={styles.eventInfo}>
                <div>
                    <EnvironmentOutlined />
                    <p>расстояние много</p>

                </div>
                <div>
                    <FieldTimeOutlined />
                    <p>расстояние много</p>

                </div>
                <div>
                  <DollarCircleOutlined />
                    <p>расстояние много</p>

                </div>

            </div>

            <div className={styles.eventTools}>
                <Button type={'primary'}>Посмотреть маршрут</Button>
                <Button>Информация</Button>
            </div>
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
                    <PauseCircleOutlined onClick={()=>props.audio.pause()} className={styles.playerIcons}/>
                    <PlayCircleOutlined onClick={()=>props.audio.play()} className={styles.playerIcons}/>

                </div>}

            </div>

        </div>
    )
}
)


export default EventComponent;

