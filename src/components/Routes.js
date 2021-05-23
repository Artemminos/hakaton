import {Route, Switch} from "react-router";

import React from "react";
import RouteComponent from "./RouteComponent";
import EventComponent from "./EventComponent";
import {Profile} from "./profile";
import MainScreen from "./MainScreen";
import RoutesList from "./RoutesList";

export const Routes = () => {
    return (
        <div className="content-wrap">
            <Switch>

                <Route path='/routesList'>
                    <RoutesList/>
                </Route>
                <Route path='/routes/:id'>
                    <RouteComponent/>
                </Route>

                <Route path='/event/:id'>
                    <EventComponent/>
                </Route>
                <Route path='/profile'>
                    <Profile/>
                </Route>


                <Route path='/'>
                    <MainScreen/>
                </Route>
                <Route path='*' render={() => <div>нет страницы</div>}/>
            </Switch>


        </div>
    );
};


