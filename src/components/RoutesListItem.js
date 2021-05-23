import React from 'react';
import styles from "../common/mainStyles.module.scss";
import {Carousel} from "antd";
import {Link} from "react-router-dom";
import EventItem from "./EventItem";
import img1 from "../static/jekskursija-v-grajvoron-iz-belgoroda-1.jpg";
import img2 from "../static/jekskursija-v-grajvoron-iz-belgoroda-2.jpg";
import img3 from "../static/jekskursija-v-grajvoron-iz-belgoroda-3.jpg";
import img4 from "../static/jekskursija-v-grajvoron-iz-belgoroda-4.jpg";
import img5 from "../static/jekskursija-v-grajvoron-iz-belgoroda-5.jpg";
import {connect} from "beautiful-react-redux";
import actions from "../redux/actions/user";
import {compose} from "redux";
import {withRouter} from "react-router";


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


const RoutesListItem = ({fetchRouteById, selectRoute,location}) => {
    let id = Number(location.pathname.slice(12));
    console.log(id)
    React.useEffect(() => {
        fetchRouteById(id)
    }, [id,location]);

    return (
        <div>
            <div className={styles.homeHeader}>
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
            <div className={styles.homeContent}>
                <h2>Новости региона</h2>
                {/*    {events.map((item, index) => {
                    return (
                        <Link to={`/event/${item.id}`}>
                            <EventItem srcAvatar={item.img[0]} text={item.name}/>
                        </Link>
                    )
                })}*/}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        events: state.user.events,
        selectRoute: state.user.selectRoute,
        routes: state.user.routes,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchRouteById: (prop) => dispatch(actions.fetchRouteById(prop)),

    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(RoutesListItem)

