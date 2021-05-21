import React from 'react';
import Slider from "react-slick";


let settings = {
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true

};

const SliderComponent = () => {
    return (
        <Slider {...settings}>
     items

        </Slider>
    );
};

export default SliderComponent;