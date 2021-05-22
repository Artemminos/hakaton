import React from 'react';
import styles from '../common/mainStyles.module.scss'
import Slider from "react-slick";
import img1 from '../static/jekskursija-v-grajvoron-iz-belgoroda-1.jpg'
import img2 from '../static/jekskursija-v-grajvoron-iz-belgoroda-1.jpg'
import img3 from '../static/jekskursija-v-grajvoron-iz-belgoroda-1.jpg'
import img4 from '../static/jekskursija-v-grajvoron-iz-belgoroda-1.jpg'
import img5 from '../static/jekskursija-v-grajvoron-iz-belgoroda-1.jpg'

const EventComponent = () => {
    const sliderRef = React.useRef();
    let settings = {
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true

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


    return (
        <div className={styles.event}>

            <h1>event name</h1>

            <div>
                <div className="App">
                </div>
            </div>
            <div className={styles.event_description}>
                description
            </div>
        </div>
    );
};

export default EventComponent;
