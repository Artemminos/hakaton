import {Redirect, Route, Switch} from "react-router";

import React from "react";
import RouteComponent from "./RouteComponent";
import EventComponent from "./EventComponent";
import Profile from "./profile";
import MainScreen from "./MainScreen";
import RoutesList from "./RoutesList";
import FavoritesComponent from "./FavoritesComponent";
import RouteStartComponent from "./RouteStartComponent";

export const Routes = () => {
    return (
        <div className="content-wrap">
            <Switch>

                <Route exact path='/routesList'>
                    <RoutesList/>
                </Route>

                <Route path='/routesList/:id'>
                    <RouteStartComponent/>
                </Route>

                <Route path='/routes/:id'>
                    <RouteComponent/>
                </Route>

                <Route path='/favorites/:id'>
                    <FavoritesComponent/>
                </Route>

                <Route path='/event/:id'>
                    <EventComponent/>
                </Route>

                <Route path='/profile'>
                    <Profile/>
                </Route>

                <Route path='/sidebar'>
                    тут будет сайд бар
                </Route>


                <Route path='/home'>
                    <MainScreen/>
                </Route>
                <Route path='*' render={() => <Redirect to={'/home'}/>}/>
            </Switch>


        </div>
    );
};


