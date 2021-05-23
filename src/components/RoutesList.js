import React from 'react';
import actions from "../redux/actions/user";
import {compose} from "redux";
import {withRouter} from "react-router";
import {connect} from "beautiful-react-redux";
import classes from '../common/mainStyles.module.scss';
import EventItem from "./EventItem";
import {Link} from "react-router-dom";

const RoutesList = ({routes}) => {
    return (
        <div className={classes.routeListWrapper}>
            <h1 className={classes.routeListHeader}>
                Результат подбора
            </h1>
            <div className={classes.routeListContent}>
                {routes.map((item, index) => {
                    return (
                        <Link to={`/routesList/${item._id}`}>
                            <EventItem srcAvatar={item.image} mark={item.mark} description={item.description}
                                       text={item.name}/>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
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
    connect(mapStateToProps, mapDispatchToProps)
)(RoutesList);
