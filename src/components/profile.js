import React from 'react';
import styles from '../common/mainStyles.module.scss'
import {Checkbox, Carousel} from 'antd';
import img1 from "../static/jekskursija-v-grajvoron-iz-belgoroda-1.jpg";
import img2 from "../static/jekskursija-v-grajvoron-iz-belgoroda-2.jpg";
import img3 from "../static/jekskursija-v-grajvoron-iz-belgoroda-3.jpg";
import img4 from "../static/jekskursija-v-grajvoron-iz-belgoroda-4.jpg";
import img5 from "../static/jekskursija-v-grajvoron-iz-belgoroda-5.jpg";

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};
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
export const Profile = () => {
    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profileInfo}>

                <div className={styles.avatar}>
                </div>
                <div className={styles.fio}>
                    <div>Русалеев Артём</div>
                    <div>+7 910 229 22 13</div>
                </div>
            </div>
            <div>
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
            <div className={styles.about}>
                <h2>Мои фильтры</h2>
                <div className={styles.content}>
                    <div className={styles.content_item}>
                        <Checkbox>Машина</Checkbox>
                        <Checkbox>Семья</Checkbox>
                        <Checkbox>Дети</Checkbox>
                        <Checkbox>Музеи</Checkbox>
                        <Checkbox>Театр</Checkbox>
                        <Checkbox>Алкоголь</Checkbox>
                        <Checkbox>Классическая музыка</Checkbox>
                    </div>

                    <div className={styles.content_item}>
                        <Checkbox>Фильмы</Checkbox>
                        <Checkbox>Исскуство</Checkbox>
                        <Checkbox>Музыка</Checkbox>
                        <Checkbox>Еда</Checkbox>
                        <Checkbox>Образвание</Checkbox>
                        <Checkbox>Релакс</Checkbox>

                    </div>

                </div>
            </div>
        </div>
    );
};

